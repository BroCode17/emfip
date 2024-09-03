import React from "react";

export default function AdminLayout(
  {
    children,
  }:
    {
      children: React.ReactNode,

    }
) {
  return <div>
    <div>{children}</div>

  </div>
}
