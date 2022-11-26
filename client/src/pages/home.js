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
        <h1 className="text-slate-200 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-type">
          THE ONLY SHOP YOU NEED
        </h1>
      </div>
    </>
  )
}

export default Home
