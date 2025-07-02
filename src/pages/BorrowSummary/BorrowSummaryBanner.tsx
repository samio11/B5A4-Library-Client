const BorrowSummaryBanner = () => {
  return (
    <div>
      <div
        className="hero min-h-[250px] md:min-h-[300px]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Borrow Summary</h1>
            <p className="mb-5">
              Review the details of borrowed books before final confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummaryBanner;
