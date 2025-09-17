"use client";

import React from "react";

export default function ErrorPage({ statusCode }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Something went wrong</h1>
      {statusCode && <p>Status Code: {statusCode}</p>}
    </div>
  );
}
