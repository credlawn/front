export interface MenuItem {
  menu_name: string;
  parent_id?: number;
  child_id?: number;
  parent_name?: string;
  menu_type: "Parent" | "Child";
  slug: string;
}

export interface MenuResponse {
  parent: MenuItem;
  children: MenuItem[];
}