import { PageProps } from "$fresh/server.ts";

export default function LayoutFooter({ Component }: PageProps) {
  return (
    <div class="layoutContainer">
      <div class="contentIndex">
        <Component />
      </div>
      <div class="layout-footer">
        <h1>Universidad Nebrija - Harry Potter Test</h1>
      </div>
    </div>
  );
}
