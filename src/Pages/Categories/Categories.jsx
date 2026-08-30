import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
import Footer from "../../Components/Footer"
import Header from "../../Components/Header";


const Categories = () => {
  const categories = [
    {
      icon: "👕",
      name: "Fashion",
      description:
        "Clothes, shoes, bags, watches and other fashion accessories.",
      count: "120+ listings",
    },
    {
      icon: "💻",
      name: "Electronics",
      description:
        "Laptops, phones, accessories, gadgets and other electronics.",
      count: "85+ listings",
    },
    {
      icon: "📚",
      name: "Books & Academic Materials",
      description:
        "Textbooks, lecture materials, past questions and academic resources.",
      count: "70+ listings",
    },
    {
      icon: "🍔",
      name: "Food & Snacks",
      description:
        "Meals, snacks, drinks and other food items from student vendors.",
      count: "60+ listings",
    },
    {
      icon: "💄",
      name: "Beauty & Personal Care",
      description:
        "Skincare, cosmetics, hair products and personal care items.",
      count: "45+ listings",
    },
    {
      icon: "🪑",
      name: "Furniture & Hostel Items",
      description:
        "Tables, chairs, room accessories and hostel essentials.",
      count: "35+ listings",
    },
    {
      icon: "🛠️",
      name: "Services",
      description:
        "Graphic design, printing, tutoring, photography and other student services.",
      count: "50+ listings",
    },
    {
      icon: "🎮",
      name: "Others",
      description:
        "Other products and services that do not fall into the listed categories.",
      count: "25+ listings",
    },
  ];

  return (
    <>
    <Header />
      <main className="categories-page">

        {/* HERO */}

        <section className="categories-hero">

          <div className="categories-hero-content">

            <p className="categories-tag">
              EXPLORE THE MARKETPLACE
            </p>

            <h1>Browse by Category</h1>

            <p>
              Explore products and services offered by students across the
              YABATECH community.
            </p>

          </div>

        </section>


        {/* CATEGORY GRID */}

        <section className="all-categories-section">

          <div className="categories-intro">

            <h2>Find What You Need</h2>

            <p>
              Browse different categories and discover products and services
              available within the campus marketplace.
            </p>

          </div>


          <div className="all-category-grid">

            {categories.map((category, index) => (

              <Link
                to={`/marketplace?category=${category.name}`}
                className="all-category-card"
                key={index}
              >

                <div className="all-category-icon">
                  {category.icon}
                </div>

                <div className="all-category-content">

                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    {category.description}
                  </p>

                  <span>
                    {category.count}
                  </span>

                </div>

                <div className="category-arrow">
                  →
                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* CTA */}

        <section className="category-cta">

          <div className="category-cta-content">

            <h2>
              Can't Find What You're Looking For?
            </h2>

            <p>
              Explore all available listings in the marketplace or post what
              you want to sell.
            </p>

            <div className="category-cta-buttons">

              <Link
                to="/marketplace"
                className="category-primary-btn"
              >
                Browse Marketplace
              </Link>

              <Link
                to="/sell"
                className="category-secondary-btn"
              >
                Start Selling
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Categories;