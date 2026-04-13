export type AdminLoginActionState = {
  status: "idle" | "error";
  message: string;
};

export const initialAdminLoginActionState: AdminLoginActionState = {
  status: "idle",
  message: "",
};