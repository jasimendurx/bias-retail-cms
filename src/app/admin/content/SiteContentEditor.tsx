"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus, Save, Trash2 } from "lucide-react";

import { saveSiteContent } from "@/actions/content";
import type { SiteContent } from "@/lib/site-content-schema";

import { initialSiteContentActionState } from "./site-content-action-state";

type SiteContentEditorProps = {
  initialContent: SiteContent;
};

type PathSegment = string | number;

function getSegmentValue(source: unknown, segment: PathSegment) {
  if (Array.isArray(source)) {
    return typeof segment === "number" ? source[segment] : undefined;
  }

  if (typeof source === "object" && source !== null) {
    return (source as Record<string, unknown>)[String(segment)];
  }

  return undefined;
}

function setSegmentValue(target: unknown, segment: PathSegment, value: unknown) {
  if (Array.isArray(target)) {
    if (typeof segment !== "number") {
      return false;
    }

    target[segment] = value;
    return true;
  }

  if (typeof target === "object" && target !== null) {
    (target as Record<string, unknown>)[String(segment)] = value;
    return true;
  }

  return false;
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass rounded-[2.5rem] border border-white/5 bg-white/2 p-8 lg:p-10 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-serif font-semibold text-white">{title}</h2>
        <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="space-y-3 block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 px-1">
          {label}
        </span>
        {hint ? (
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-600 font-bold">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
    </label>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary inline-flex items-center space-x-4 bg-white text-black py-4 px-12 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
          Saving...
        </span>
      ) : (
        <>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
            Save Site Content
          </span>
          <Save
            size={16}
            className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
          />
        </>
      )}
    </button>
  );
}

function getValueAtPath(source: unknown, path: PathSegment[]) {
  let current: unknown = source;

  for (const segment of path) {
    current = getSegmentValue(current, segment);
  }

  return current;
}

function setValueAtPath<T>(source: T, path: PathSegment[], value: unknown): T {
  const next = structuredClone(source);
  let current: unknown = next;

  for (let index = 0; index < path.length - 1; index += 1) {
    current = getSegmentValue(current, path[index]);
  }

  setSegmentValue(current, path[path.length - 1], value);
  return next;
}

export default function SiteContentEditor({ initialContent }: SiteContentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [state, formAction] = useActionState(
    saveSiteContent,
    initialSiteContentActionState,
  );

  const inputClassName =
    "w-full rounded-[1.25rem] bg-black/30 border border-white/10 px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-all text-sm font-light";
  const textareaClassName =
    "w-full rounded-[1.5rem] bg-black/30 border border-white/10 px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-all text-sm font-light resize-y leading-relaxed min-h-28";
  const ghostButtonClassName =
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-300 hover:border-accent/30 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
  const statusClassName =
    state.status === "error"
      ? "border-red-500/20 bg-red-500/10 text-red-200"
      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-200";

  const updateField = (path: PathSegment[], value: string) => {
    setContent((current) => setValueAtPath(current, path, value));
  };

  const addArrayItem = (path: PathSegment[], item: unknown) => {
    setContent((current) => {
      const next = structuredClone(current);
      const target = getValueAtPath(next, path) as unknown[];
      target.push(item);
      return next;
    });
  };

  const removeArrayItem = (path: PathSegment[], index: number) => {
    setContent((current) => {
      const next = structuredClone(current);
      const target = getValueAtPath(next, path) as unknown[];

      if (target.length <= 1) {
        return current;
      }

      target.splice(index, 1);
      return next;
    });
  };

  const renderLinkArrayEditor = (
    title: string,
    path: PathSegment[],
    items: Array<{ label: string; href: string }>,
    addLabel: string,
  ) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 font-bold">{title}</h3>
        <button
          type="button"
          onClick={() => addArrayItem(path, { label: "New Link", href: "/" })}
          className={ghostButtonClassName}
        >
          <Plus size={14} />
          <span>{addLabel}</span>
        </button>
      </div>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="grid gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] items-end rounded-[1.75rem] border border-white/5 bg-black/20 p-4">
          <Field label="Label">
            <input
              type="text"
              value={item.label}
              onChange={(event) => updateField([...path, index, "label"], event.target.value)}
              className={inputClassName}
            />
          </Field>
          <Field label="Href">
            <input
              type="text"
              value={item.href}
              onChange={(event) => updateField([...path, index, "href"], event.target.value)}
              className={inputClassName}
            />
          </Field>
          <button
            type="button"
            onClick={() => removeArrayItem(path, index)}
            disabled={items.length === 1}
            className={`${ghostButtonClassName} h-12 justify-center px-3`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderStringArrayEditor = (
    title: string,
    path: PathSegment[],
    items: string[],
    addLabel: string,
    placeholder: string,
  ) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 font-bold">{title}</h3>
        <button
          type="button"
          onClick={() => addArrayItem(path, placeholder)}
          className={ghostButtonClassName}
        >
          <Plus size={14} />
          <span>{addLabel}</span>
        </button>
      </div>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] items-end rounded-[1.75rem] border border-white/5 bg-black/20 p-4">
          <Field label="Value">
            <input
              type="text"
              value={item}
              onChange={(event) => updateField([...path, index], event.target.value)}
              className={inputClassName}
            />
          </Field>
          <button
            type="button"
            onClick={() => removeArrayItem(path, index)}
            disabled={items.length === 1}
            className={`${ghostButtonClassName} h-12 justify-center px-3`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderTitledDescriptionArrayEditor = (
    title: string,
    path: PathSegment[],
    items: Array<{ title: string; description: string }>,
    addLabel: string,
  ) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 font-bold">{title}</h3>
        <button
          type="button"
          onClick={() => addArrayItem(path, { title: "New Item", description: "Add description" })}
          className={ghostButtonClassName}
        >
          <Plus size={14} />
          <span>{addLabel}</span>
        </button>
      </div>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="space-y-4 rounded-[1.75rem] border border-white/5 bg-black/20 p-4">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] items-end">
            <Field label="Title">
              <input
                type="text"
                value={item.title}
                onChange={(event) => updateField([...path, index, "title"], event.target.value)}
                className={inputClassName}
              />
            </Field>
            <button
              type="button"
              onClick={() => removeArrayItem(path, index)}
              disabled={items.length === 1}
              className={`${ghostButtonClassName} h-12 justify-center px-3`}
            >
              <Trash2 size={14} />
            </button>
          </div>
          <Field label="Description">
            <textarea
              rows={4}
              value={item.description}
              onChange={(event) => updateField([...path, index, "description"], event.target.value)}
              className={textareaClassName}
            />
          </Field>
        </div>
      ))}
    </div>
  );

  const renderStatsEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 font-bold">Home Stats</h3>
        <button
          type="button"
          onClick={() => addArrayItem(["home", "about", "stats"], { value: "0", label: "New Stat" })}
          className={ghostButtonClassName}
        >
          <Plus size={14} />
          <span>Add Stat</span>
        </button>
      </div>
      {content.home.about.stats.map((item, index) => (
        <div key={`home-stat-${index}`} className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)_auto] items-end rounded-[1.75rem] border border-white/5 bg-black/20 p-4">
          <Field label="Value">
            <input
              type="text"
              value={item.value}
              onChange={(event) => updateField(["home", "about", "stats", index, "value"], event.target.value)}
              className={inputClassName}
            />
          </Field>
          <Field label="Label">
            <input
              type="text"
              value={item.label}
              onChange={(event) => updateField(["home", "about", "stats", index, "label"], event.target.value)}
              className={inputClassName}
            />
          </Field>
          <button
            type="button"
            onClick={() => removeArrayItem(["home", "about", "stats"], index)}
            disabled={content.home.about.stats.length === 1}
            className={`${ghostButtonClassName} h-12 justify-center px-3`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderJobsEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 font-bold">Career Jobs</h3>
        <button
          type="button"
          onClick={() =>
            addArrayItem(["careers", "jobs"], {
              title: "New Role",
              brand: "Brand Name",
              location: "Location",
              type: "Full-Time",
              posted: "Today",
              description: "Describe the opportunity.",
            })
          }
          className={ghostButtonClassName}
        >
          <Plus size={14} />
          <span>Add Job</span>
        </button>
      </div>
      {content.careers.jobs.map((job, index) => (
        <div key={`job-${index}`} className="space-y-4 rounded-[1.75rem] border border-white/5 bg-black/20 p-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Field label="Title">
              <input type="text" value={job.title} onChange={(event) => updateField(["careers", "jobs", index, "title"], event.target.value)} className={inputClassName} />
            </Field>
            <Field label="Brand">
              <input type="text" value={job.brand} onChange={(event) => updateField(["careers", "jobs", index, "brand"], event.target.value)} className={inputClassName} />
            </Field>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <Field label="Location">
              <input type="text" value={job.location} onChange={(event) => updateField(["careers", "jobs", index, "location"], event.target.value)} className={inputClassName} />
            </Field>
            <Field label="Type">
              <input type="text" value={job.type} onChange={(event) => updateField(["careers", "jobs", index, "type"], event.target.value)} className={inputClassName} />
            </Field>
            <Field label="Posted">
              <input type="text" value={job.posted} onChange={(event) => updateField(["careers", "jobs", index, "posted"], event.target.value)} className={inputClassName} />
            </Field>
          </div>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] items-end">
            <Field label="Description">
              <textarea rows={4} value={job.description} onChange={(event) => updateField(["careers", "jobs", index, "description"], event.target.value)} className={textareaClassName} />
            </Field>
            <button
              type="button"
              onClick={() => removeArrayItem(["careers", "jobs"], index)}
              disabled={content.careers.jobs.length === 1}
              className={`${ghostButtonClassName} h-12 justify-center px-3`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEventsEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm uppercase tracking-[0.3em] text-neutral-500 font-bold">Event Items</h3>
        <button
          type="button"
          onClick={() =>
            addArrayItem(["events", "items"], {
              title: "New Event",
              brand: "Brand Name",
              date: "Date",
              location: "Location",
              description: "Describe the event.",
              image: "/event-image.png",
            })
          }
          className={ghostButtonClassName}
        >
          <Plus size={14} />
          <span>Add Event</span>
        </button>
      </div>
      {content.events.items.map((item, index) => (
        <div key={`event-${index}`} className="space-y-4 rounded-[1.75rem] border border-white/5 bg-black/20 p-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Field label="Title">
              <input type="text" value={item.title} onChange={(event) => updateField(["events", "items", index, "title"], event.target.value)} className={inputClassName} />
            </Field>
            <Field label="Brand">
              <input type="text" value={item.brand} onChange={(event) => updateField(["events", "items", index, "brand"], event.target.value)} className={inputClassName} />
            </Field>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <Field label="Date">
              <input type="text" value={item.date} onChange={(event) => updateField(["events", "items", index, "date"], event.target.value)} className={inputClassName} />
            </Field>
            <Field label="Location">
              <input type="text" value={item.location} onChange={(event) => updateField(["events", "items", index, "location"], event.target.value)} className={inputClassName} />
            </Field>
            <Field label="Image Path or URL">
              <input type="text" value={item.image} onChange={(event) => updateField(["events", "items", index, "image"], event.target.value)} className={inputClassName} />
            </Field>
          </div>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] items-end">
            <Field label="Description">
              <textarea rows={4} value={item.description} onChange={(event) => updateField(["events", "items", index, "description"], event.target.value)} className={textareaClassName} />
            </Field>
            <button
              type="button"
              onClick={() => removeArrayItem(["events", "items"], index)}
              disabled={content.events.items.length === 1}
              className={`${ghostButtonClassName} h-12 justify-center px-3`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <form action={formAction} className="space-y-10">
      <input type="hidden" name="payload" value={JSON.stringify(content)} />

      {state.message ? (
        <div className={`rounded-[1.5rem] border px-5 py-4 text-sm font-light ${statusClassName}`}>
          {state.message}
        </div>
      ) : null}

      <SectionCard title="Navbar" description="Update the global header brand lockup and the primary navigation links.">
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Brand Prefix">
            <input type="text" value={content.navbar.brandPrefix} onChange={(event) => updateField(["navbar", "brandPrefix"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Brand Accent">
            <input type="text" value={content.navbar.brandAccent} onChange={(event) => updateField(["navbar", "brandAccent"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        {renderLinkArrayEditor("Navbar Links", ["navbar", "links"], content.navbar.links, "Add Link")}
      </SectionCard>

      <SectionCard title="Footer" description="Manage the footer description, contact details, social link, and footer navigation.">
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Brand Name">
            <input type="text" value={content.footer.brandName} onChange={(event) => updateField(["footer", "brandName"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Contact Email">
            <input type="text" value={content.footer.email} onChange={(event) => updateField(["footer", "email"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Address Line">
            <input type="text" value={content.footer.addressLine} onChange={(event) => updateField(["footer", "addressLine"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Copyright">
            <input type="text" value={content.footer.copyright} onChange={(event) => updateField(["footer", "copyright"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <Field label="Footer Description">
          <textarea rows={4} value={content.footer.description} onChange={(event) => updateField(["footer", "description"], event.target.value)} className={textareaClassName} />
        </Field>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Social Label">
            <input type="text" value={content.footer.socialLabel} onChange={(event) => updateField(["footer", "socialLabel"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Social URL">
            <input type="text" value={content.footer.socialUrl} onChange={(event) => updateField(["footer", "socialUrl"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Company Section Title">
            <input type="text" value={content.footer.companyTitle} onChange={(event) => updateField(["footer", "companyTitle"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Connect Section Title">
            <input type="text" value={content.footer.connectTitle} onChange={(event) => updateField(["footer", "connectTitle"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        {renderLinkArrayEditor("Company Links", ["footer", "companyLinks"], content.footer.companyLinks, "Add Company Link")}
        {renderLinkArrayEditor("Connect Links", ["footer", "connectLinks"], content.footer.connectLinks, "Add Connect Link")}
        {renderLinkArrayEditor("Legal Links", ["footer", "legalLinks"], content.footer.legalLinks, "Add Legal Link")}
      </SectionCard>

      <SectionCard title="Homepage" description="Control the hero, About section, mission statement, and vision cards on the landing page.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Field label="Hero Title Line One">
            <input type="text" value={content.home.hero.titleLineOne} onChange={(event) => updateField(["home", "hero", "titleLineOne"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Hero Title Line Two">
            <input type="text" value={content.home.hero.titleLineTwo} onChange={(event) => updateField(["home", "hero", "titleLineTwo"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
          <Field label="Hero Description">
            <textarea rows={4} value={content.home.hero.description} onChange={(event) => updateField(["home", "hero", "description"], event.target.value)} className={textareaClassName} />
          </Field>
          <Field label="Hero CTA Label">
            <input type="text" value={content.home.hero.ctaLabel} onChange={(event) => updateField(["home", "hero", "ctaLabel"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <Field label="About Title">
          <input type="text" value={content.home.about.title} onChange={(event) => updateField(["home", "about", "title"], event.target.value)} className={inputClassName} />
        </Field>
        {renderStringArrayEditor("About Paragraphs", ["home", "about", "paragraphs"], content.home.about.paragraphs, "Add Paragraph", "New paragraph")}
        {renderStatsEditor()}
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <Field label="Mission Eyebrow">
            <input type="text" value={content.home.mission.eyebrow} onChange={(event) => updateField(["home", "mission", "eyebrow"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Mission Quote">
            <textarea rows={3} value={content.home.mission.quote} onChange={(event) => updateField(["home", "mission", "quote"], event.target.value)} className={textareaClassName} />
          </Field>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Field label="Vision Title">
            <input type="text" value={content.home.vision.title} onChange={(event) => updateField(["home", "vision", "title"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Vision Description">
            <textarea rows={3} value={content.home.vision.description} onChange={(event) => updateField(["home", "vision", "description"], event.target.value)} className={textareaClassName} />
          </Field>
        </div>
        {renderTitledDescriptionArrayEditor("Vision Items", ["home", "vision", "items"], content.home.vision.items, "Add Vision Item")}
      </SectionCard>

      <SectionCard title="Brands Page" description="Manage the copy around the dynamic brands collection.">
        <div className="grid gap-6 lg:grid-cols-3">
          <Field label="Eyebrow">
            <input type="text" value={content.brandsPage.hero.eyebrow} onChange={(event) => updateField(["brandsPage", "hero", "eyebrow"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Title Line One">
            <input type="text" value={content.brandsPage.hero.titleLineOne} onChange={(event) => updateField(["brandsPage", "hero", "titleLineOne"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Title Line Two">
            <input type="text" value={content.brandsPage.hero.titleLineTwo} onChange={(event) => updateField(["brandsPage", "hero", "titleLineTwo"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <Field label="Hero Description">
          <textarea rows={3} value={content.brandsPage.hero.description} onChange={(event) => updateField(["brandsPage", "hero", "description"], event.target.value)} className={textareaClassName} />
        </Field>
        <div className="grid gap-6 lg:grid-cols-3">
          <Field label="Empty State">
            <input type="text" value={content.brandsPage.emptyState} onChange={(event) => updateField(["brandsPage", "emptyState"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Read More Label">
            <input type="text" value={content.brandsPage.readMoreLabel} onChange={(event) => updateField(["brandsPage", "readMoreLabel"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Read Less Label">
            <input type="text" value={content.brandsPage.readLessLabel} onChange={(event) => updateField(["brandsPage", "readLessLabel"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <Field label="Website Label">
          <input type="text" value={content.brandsPage.websiteLabel} onChange={(event) => updateField(["brandsPage", "websiteLabel"], event.target.value)} className={inputClassName} />
        </Field>
      </SectionCard>

      <SectionCard title="Contact Page" description="Edit the contact hero, form labels, inquiry types, and contact details.">
        <div className="grid gap-6 lg:grid-cols-3">
          <Field label="Hero Eyebrow">
            <input type="text" value={content.contact.hero.eyebrow} onChange={(event) => updateField(["contact", "hero", "eyebrow"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Hero Title Line One">
            <input type="text" value={content.contact.hero.titleLineOne} onChange={(event) => updateField(["contact", "hero", "titleLineOne"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Hero Title Line Two">
            <input type="text" value={content.contact.hero.titleLineTwo} onChange={(event) => updateField(["contact", "hero", "titleLineTwo"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <Field label="Hero Description">
          <textarea rows={3} value={content.contact.hero.description} onChange={(event) => updateField(["contact", "hero", "description"], event.target.value)} className={textareaClassName} />
        </Field>
        <div className="grid gap-6 lg:grid-cols-2">
          <Field label="Form Title">
            <input type="text" value={content.contact.form.title} onChange={(event) => updateField(["contact", "form", "title"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Submit Label">
            <input type="text" value={content.contact.form.submitLabel} onChange={(event) => updateField(["contact", "form", "submitLabel"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Field label="Name Label">
            <input type="text" value={content.contact.form.nameLabel} onChange={(event) => updateField(["contact", "form", "nameLabel"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Name Placeholder">
            <input type="text" value={content.contact.form.namePlaceholder} onChange={(event) => updateField(["contact", "form", "namePlaceholder"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Field label="Email Label">
            <input type="text" value={content.contact.form.emailLabel} onChange={(event) => updateField(["contact", "form", "emailLabel"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Email Placeholder">
            <input type="text" value={content.contact.form.emailPlaceholder} onChange={(event) => updateField(["contact", "form", "emailPlaceholder"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Field label="Inquiry Type Label">
            <input type="text" value={content.contact.form.typeLabel} onChange={(event) => updateField(["contact", "form", "typeLabel"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Message Label">
            <input type="text" value={content.contact.form.messageLabel} onChange={(event) => updateField(["contact", "form", "messageLabel"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <Field label="Message Placeholder">
          <input type="text" value={content.contact.form.messagePlaceholder} onChange={(event) => updateField(["contact", "form", "messagePlaceholder"], event.target.value)} className={inputClassName} />
        </Field>
        {renderStringArrayEditor("Inquiry Options", ["contact", "form", "inquiryOptions"], content.contact.form.inquiryOptions, "Add Option", "New inquiry type")}
        <div className="grid gap-6 lg:grid-cols-2">
          <Field label="Headquarters Title">
            <input type="text" value={content.contact.details.headquartersTitle} onChange={(event) => updateField(["contact", "details", "headquartersTitle"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Maps Label">
            <input type="text" value={content.contact.details.mapsLabel} onChange={(event) => updateField(["contact", "details", "mapsLabel"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Field label="Maps URL">
            <input type="text" value={content.contact.details.mapsUrl} onChange={(event) => updateField(["contact", "details", "mapsUrl"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Email Title">
            <input type="text" value={content.contact.details.emailTitle} onChange={(event) => updateField(["contact", "details", "emailTitle"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Email Address">
            <input type="text" value={content.contact.details.email} onChange={(event) => updateField(["contact", "details", "email"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Field label="Phone Title">
            <input type="text" value={content.contact.details.phoneTitle} onChange={(event) => updateField(["contact", "details", "phoneTitle"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Phone Number">
            <input type="text" value={content.contact.details.phone} onChange={(event) => updateField(["contact", "details", "phone"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        {renderStringArrayEditor("Address Lines", ["contact", "details", "addressLines"], content.contact.details.addressLines, "Add Address Line", "New address line")}
      </SectionCard>

      <SectionCard title="Careers Page" description="Edit the hero, culture highlights, section labels, and all job cards.">
        <div className="grid gap-6 lg:grid-cols-3">
          <Field label="Hero Eyebrow">
            <input type="text" value={content.careers.hero.eyebrow} onChange={(event) => updateField(["careers", "hero", "eyebrow"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Hero Title Line One">
            <input type="text" value={content.careers.hero.titleLineOne} onChange={(event) => updateField(["careers", "hero", "titleLineOne"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Hero Title Line Two">
            <input type="text" value={content.careers.hero.titleLineTwo} onChange={(event) => updateField(["careers", "hero", "titleLineTwo"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <Field label="Hero Description">
          <textarea rows={3} value={content.careers.hero.description} onChange={(event) => updateField(["careers", "hero", "description"], event.target.value)} className={textareaClassName} />
        </Field>
        <div className="grid gap-6 lg:grid-cols-3">
          <Field label="Jobs Section Title">
            <input type="text" value={content.careers.jobsSectionTitle} onChange={(event) => updateField(["careers", "jobsSectionTitle"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Jobs Section Tag">
            <input type="text" value={content.careers.jobsSectionTag} onChange={(event) => updateField(["careers", "jobsSectionTag"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Apply Label">
            <input type="text" value={content.careers.applyLabel} onChange={(event) => updateField(["careers", "applyLabel"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        {renderTitledDescriptionArrayEditor("Culture Highlights", ["careers", "highlights"], content.careers.highlights, "Add Highlight")}
        {renderJobsEditor()}
      </SectionCard>

      <SectionCard title="Events Page" description="Edit the hero, spotlight section, event calendar labels, and every event card.">
        <div className="grid gap-6 lg:grid-cols-3">
          <Field label="Hero Eyebrow">
            <input type="text" value={content.events.hero.eyebrow} onChange={(event) => updateField(["events", "hero", "eyebrow"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Hero Title Line One">
            <input type="text" value={content.events.hero.titleLineOne} onChange={(event) => updateField(["events", "hero", "titleLineOne"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Hero Title Line Two">
            <input type="text" value={content.events.hero.titleLineTwo} onChange={(event) => updateField(["events", "hero", "titleLineTwo"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <Field label="Hero Description">
          <textarea rows={3} value={content.events.hero.description} onChange={(event) => updateField(["events", "hero", "description"], event.target.value)} className={textareaClassName} />
        </Field>
        <div className="grid gap-6 lg:grid-cols-3">
          <Field label="Spotlight Eyebrow">
            <input type="text" value={content.events.spotlight.eyebrow} onChange={(event) => updateField(["events", "spotlight", "eyebrow"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Spotlight Title Line One">
            <input type="text" value={content.events.spotlight.titleLineOne} onChange={(event) => updateField(["events", "spotlight", "titleLineOne"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Spotlight Title Line Two">
            <input type="text" value={content.events.spotlight.titleLineTwo} onChange={(event) => updateField(["events", "spotlight", "titleLineTwo"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Field label="Spotlight Description">
            <textarea rows={4} value={content.events.spotlight.description} onChange={(event) => updateField(["events", "spotlight", "description"], event.target.value)} className={textareaClassName} />
          </Field>
          <Field label="Spotlight Image Path or URL">
            <input type="text" value={content.events.spotlight.image} onChange={(event) => updateField(["events", "spotlight", "image"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        {renderStringArrayEditor("Spotlight Features", ["events", "spotlight", "featureItems"], content.events.spotlight.featureItems, "Add Feature", "New spotlight feature")}
        <div className="grid gap-6 lg:grid-cols-3">
          <Field label="Calendar Title">
            <input type="text" value={content.events.calendarTitle} onChange={(event) => updateField(["events", "calendarTitle"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Calendar Tag">
            <input type="text" value={content.events.calendarTag} onChange={(event) => updateField(["events", "calendarTag"], event.target.value)} className={inputClassName} />
          </Field>
          <Field label="Reserve Label">
            <input type="text" value={content.events.reserveLabel} onChange={(event) => updateField(["events", "reserveLabel"], event.target.value)} className={inputClassName} />
          </Field>
        </div>
        {renderEventsEditor()}
      </SectionCard>

      <div className="flex justify-end pb-6">
        <SaveButton />
      </div>
    </form>
  );
}