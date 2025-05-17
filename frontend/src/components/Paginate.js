import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  if (pages <= 1) return null;

  const getPath = (x) => {
    const p = x + 1;
    if (isAdmin) return `/admin/productlist/${p}`;
    if (keyword) return `/search/${keyword}/page/${p}`;
    return `/page/${p}`;
  };

  return (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <Pagination.Item
          key={x + 1}
          active={x + 1 === page}
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = getPath(x))}
        >
          {x + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Paginate;
