import React from "react";

const Favorites = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center">
      <div className="w-[90vw] flex flex-col">
        <h1 className="text-[32px] mt-2">Favorites item2</h1>
        <div className="row">
          <div className="col-12">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="table-content table-responsive">
                <div style={{ overflowX: "auto" }}>
                  <table style={{ border: "none" }}>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderRight: "none",
                        }}
                      >
                        Item
                      </th>
                      <th style={{ textAlign: "center", borderRight: "none" }}>
                        Quantity
                      </th>
                      <th style={{ textAlign: "center", borderRight: "none" }}>
                        Price
                      </th>
                      <th style={{ textAlign: "center", borderRight: "none" }}>
                        Discount
                      </th>
                      <th style={{ textAlign: "center", borderRight: "none" }}>
                        GST
                      </th>
                      <th
                        style={{ textAlign: "center", borderRight: "none" }}
                        className="whitespace-nowrap"
                      >
                        Total (inc GST)
                      </th>
                    </tr>
                    {/* {wishlist.map((item, i) => (
                    <SingleWishlist key={i} item={item} />
                  ))} */}
                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
