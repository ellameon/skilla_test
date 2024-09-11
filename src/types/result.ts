export type Result = {
  type: "is_new" | "message" | "order" | "preorder"
  title: string
  tooltip?: string
}