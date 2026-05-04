function Carousel1() {
  return (
    <div className="d-flex justify-content-center mt-4">
      <div style={{ width: "70%" }}>
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <div className="d-flex align-items-center">
                <img
                  src="http://2.bp.blogspot.com/-3uWlZFNQZfA/VWxw8zRc5CI/AAAAAAAA4OE/MIQAyrOzWI0/s1600/DSC00070_3-01.jpeg"
                  className="w-50"
                  style={{ height: "300px", objectFit: "cover" }}
                  alt="Mango Pickle"
                />
                <div className="p-4 w-50">
                  <h3>Mango Pickle 🥭</h3>
                  <p>Spicy traditional pickle made with raw mango.</p>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="d-flex align-items-center">
                <img
                  src="https://cdn.shopaccino.com/refresh/articles/shutterstock612758558-788373_l.jpg"
                  className="w-50"
                  style={{ height: "300px", objectFit: "cover" }}
                  alt="Lemon Pickle"
                />
                <div className="p-4 w-50">
                  <h3>Lemon Pickle 🍋</h3>
                  <p>Tangy and spicy lemon pickle.</p>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <div className="d-flex align-items-center">
                <img
                  src="https://static.toiimg.com/photo/93734927.cms"
                  className="w-50"
                  style={{ height: "300px", objectFit: "cover" }}
                  alt="Garlic Pickle"
                />
                <div className="p-4 w-50">
                  <h3>Garlic Pickle 🧄</h3>
                  <p>Rich and flavorful garlic pickle.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Button */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          {/* Next Button */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel1;
