import React from 'react'
import UserSidebar from "../Components/UserSidebar";
import UserMenuSm from "../Components/UserMenuSm";

const ProductsPage = () => {
  return (
    <>
      <UserSidebar />
      <main className="flex flex-col rounded-lg w-full min-h-screen overflow-y-auto">
        <div className="w-full">
          <UserMenuSm />
        </div>
      </main>
    </>
  )
}

export default ProductsPage
