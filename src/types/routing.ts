export interface AppRoute {
  path: string;
  url: string;
  component: React.FC;
  displayName: string;
  exact?: boolean;
  render?: (...args: any) => React.FC;
}
