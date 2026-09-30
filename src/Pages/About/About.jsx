import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./About.css";

const About = () => {
  const teamMembers = [
    {
      name: "Kareem Habeeb Omogbolahan",
      role: "Computer Science Student",
      image:
        "https://i.postimg.cc/DZ6g8WpM/Whats-App-Image-2026-09-29-at-16-59-10.jpg",
      description:
        "Part of the team behind the idea and development of Campus Digital Marketplace.",
    },
    {
      name: "Femi-Ologbe Moyinoluwa",
      role: "Computer Science Student",
      image: "https://i.postimg.cc/brsyFwdh/Whats-App-Image-2026-09-29-at-20-02-11.jpg",
      description:
        "A member of the development team helping to turn the marketplace idea into a functional digital platform.",
    },
    {
      name: "Hamzat",
      role: "Computer Science Student",
      image: "/src/assets/team/hamzat.jpg",
      description:
        "A member of the team contributing to the development and overall realization of the Campus Digital Marketplace.",
    },
  ];

  return (
    <>
      <Header />

      <main className="about-page">
        {/* HERO */}
        <section className="about-hero">
          <div className="about-hero-content">
            <span className="about-tag">YABATECH • COMPUTER SCIENCE</span>

            <h1>
              Built by Students.
              <br />
              <span>Inspired by a Real Problem.</span>
            </h1>

            <p>
              Campus Digital Marketplace is a student-focused platform created
              to make buying and selling within the YABATECH community more
              organized, accessible, and convenient.
            </p>

            <div className="about-hero-buttons">
              <Link to="/marketplace" className="about-primary-btn">
                Explore Marketplace
              </Link>

              <a href="#our-story" className="about-secondary-btn">
                Our Story ↓
              </a>
            </div>
          </div>

          <div className="about-hero-card">
            <div className="hero-card-icon">CD</div>
            <h3>Campus Digital Marketplace</h3>
            <p>
              A digital marketplace designed with the YABATECH student community
              in mind.
            </p>

            <div className="hero-card-line"></div>

            <span>Yaba College of Technology</span>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="about-section story-section" id="our-story">
          <div className="section-heading">
            <span>OUR STORY</span>
            <h2>Why did we build this?</h2>
          </div>

          <div className="story-grid">
            <div className="story-text">
              <p>
                As students of Yaba College of Technology, we noticed that
                students regularly buy and sell different products and services
                within the school community.
              </p>

              <p>
                However, many of these transactions depend on WhatsApp groups,
                social media platforms, personal contacts, and referrals.
                Although these methods can be useful, product advertisements can
                easily get buried among other messages.
              </p>

              <p>
                This can make it difficult for buyers to discover available
                products and for student sellers to reach the people who may
                actually need what they offer.
              </p>

              <p className="story-highlight">
                We saw a problem within our own environment and asked ourselves:{" "}
                <strong>
                  What if there was one dedicated digital marketplace for the
                  YABATECH community?
                </strong>
              </p>

              <p>
                That question became the idea behind Campus Digital Marketplace.
              </p>
            </div>

            <div className="story-box">
              <div className="story-box-number">01</div>

              <h3>From Observation</h3>

              <p>
                We noticed how students advertise and discover products through
                scattered communication channels.
              </p>

              <div className="story-arrow">↓</div>

              <div className="story-box-number">02</div>

              <h3>To an Idea</h3>

              <p>
                We imagined a centralized platform dedicated to student buying
                and selling.
              </p>

              <div className="story-arrow">↓</div>

              <div className="story-box-number">03</div>

              <h3>To a Solution</h3>

              <p>
                We began developing Campus Digital Marketplace as a practical
                technology solution.
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="problem-section">
          <div className="about-section">
            <div className="section-heading center-heading">
              <span>THE PROBLEM</span>
              <h2>What are we trying to solve?</h2>
              <p>
                The platform is designed around challenges students can
                experience when buying and selling within the campus community.
              </p>
            </div>

            <div className="problem-grid">
              <div className="problem-card">
                <div className="problem-number">01</div>
                <h3>Scattered Advertisements</h3>
                <p>
                  Product advertisements can quickly disappear inside busy
                  WhatsApp groups and social media feeds.
                </p>
              </div>

              <div className="problem-card">
                <div className="problem-number">02</div>
                <h3>Difficult Discovery</h3>
                <p>
                  Buyers may find it difficult to discover available products
                  when listings are spread across different platforms.
                </p>
              </div>

              <div className="problem-card">
                <div className="problem-number">03</div>
                <h3>Limited Seller Reach</h3>
                <p>
                  Student sellers may struggle to reach a wider audience within
                  the school community.
                </p>
              </div>

              <div className="problem-card">
                <div className="problem-number">04</div>
                <h3>Unorganized Trading</h3>
                <p>
                  There is a need for a more organized digital environment for
                  campus-based buying and selling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE PROVIDE */}
        <section className="about-section">
          <div className="section-heading">
            <span>OUR APPROACH</span>
            <h2>What we want to provide</h2>
          </div>

          <div className="approach-grid">
            <div className="approach-card">
              <div className="approach-icon">🔎</div>
              <h3>Easy Discovery</h3>
              <p>
                Give students a central place to discover products and services
                available within the campus community.
              </p>
            </div>

            <div className="approach-card">
              <div className="approach-icon">📢</div>
              <h3>Better Visibility</h3>
              <p>
                Give student sellers a dedicated space to showcase what they
                have to offer.
              </p>
            </div>

            <div className="approach-card">
              <div className="approach-icon">🛍️</div>
              <h3>Organized Marketplace</h3>
              <p>
                Bring campus buying and selling activities into one structured
                digital environment.
              </p>
            </div>

            <div className="approach-card">
              <div className="approach-icon">🤝</div>
              <h3>Campus Connection</h3>
              <p>
                Create a platform that connects students who have products or
                services with students who need them.
              </p>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="team-section">
          <div className="about-section">
            <div className="section-heading center-heading">
              <span>THE TEAM</span>
              <h2>Meet the students behind the idea</h2>
              <p>
                Three Computer Science students. One problem. One idea. One
                digital solution.
              </p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member) => (
                <div className="team-card" key={member.name}>
                  <div className="team-image-wrapper">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                    />
                  </div>

                  <div className="team-info">
                    <span>{member.role}</span>
                    <h3>{member.name}</h3>
                    <p>{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECT */}
        <section className="about-section project-section">
          <div className="project-content">
            <span>MORE THAN A SCHOOL PROJECT</span>

            <h2>
              We saw a problem in our environment and decided to build a
              solution.
            </h2>

            <p>
              Campus Digital Marketplace started as a school project, but the
              problem behind it is real. As students, we experience the same
              environment that inspired this platform.
            </p>

            <p>
              Building this system gives us an opportunity to take a practical
              problem within our community and approach it from a technological
              perspective.
            </p>

            <p>
              Through this project, we are demonstrating how software can be
              used to improve everyday activities within our school community.
            </p>
          </div>
        </section>

        {/* VISION */}
        <section className="vision-section">
          <div className="vision-content">
            <span>OUR VISION</span>

            <h2>
              Making campus commerce
              <br />
              <strong>simpler and more connected.</strong>
            </h2>

            <p>
              Our goal is to create a more organized and accessible way for
              members of the YABATECH community to buy, sell, and discover
              products and services.
            </p>

            <Link to="/marketplace" className="vision-button">
              Visit the Marketplace →
            </Link>
          </div>
        </section>

        {/* FINAL MESSAGE */}
        <section className="final-about">
          <h2>Built for YABATECH.</h2>
          <p>Inspired by a real problem. Created by students.</p>

          <div className="final-line"></div>

          <strong>Campus Digital Marketplace</strong>
          <span>Your Campus. Your Marketplace.</span>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
