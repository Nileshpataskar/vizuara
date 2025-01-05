export default function NewFolderLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <main className="flex  w-full h-full">
        <div
          style={{
            backgroundImage:
              "url('https://i0.wp.com/allpicts.in/wp-content/uploads/2016/03/Airplane-Images-with-Beautiful-Picture-of-Flight-in-Sunset.jpg?w=2280&ssl=1')",
            backgroundSize: "cover", // Zooms the image by 20%
            backgroundPosition: "center", // Keeps the image centered
            backgroundRepeat: "no-repeat", // Prevents repeating
            width: "100%",
            height: "100vh",
          }}
          className='min-h-screen'
        >
          {children}
        </div>
      </main>
    </div>
  );
}
