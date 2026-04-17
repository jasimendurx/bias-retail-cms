export type SiteContentActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialSiteContentActionState: SiteContentActionState = {
  status: "idle",
  message: "",
};