const Home = () => {
  return (
    <>
      <div className="flex relative">
        <video className="w-full" autoPlay loop muted>
          <source
            src="https://cdn.shopify.com/videos/c/o/v/1dffd6574e6f4b7eaa4b43ba9703676b.mp4"
            type="video/mp4"
          />
        </video>
        <h1 className="text-slate-200 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
          THE ONLY SHOP YOU NEED
        </h1>
      </div>

      <div className="grid grid-cols-3 p-4 gap-4">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />

          <h1 className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            UNISHOP
          </h1>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534349735944-2b3a6f7a268f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />

          <h1 className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            UNISHOP
          </h1>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1511406933301-8e740b28cc89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1563&q=80"
            alt=""
            className="h-full"
          />

          <h1 className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            UNISHOP
          </h1>
        </div>
      </div>
    </>
  )
}

export default Home
