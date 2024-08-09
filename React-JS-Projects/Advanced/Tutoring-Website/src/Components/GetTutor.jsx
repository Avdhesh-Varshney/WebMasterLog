import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GetTutor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import tutorsData from "../data/data";

function TutorCards() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    subjectsTaught: "",
    qualifications: "",
    hourlyRate: "",
  });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  useEffect(() => {
    fetchTutors();
  }, []);

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const fetchTutors = async () => {
    try {
      setTutors(tutorsData);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch tutors");
      setLoading(false);
    }
  };

  const handleFilter = () => {
    const filteredTutors = tutorsData.filter((tutor) => {
      return (
        (!filters.subjectsTaught ||
          tutor.subject
            .toLowerCase()
            .includes(filters.subjectsTaught.toLowerCase())) &&
        (!filters.qualifications ||
          tutor.info
            .toLowerCase()
            .includes(filters.qualifications.toLowerCase())) &&
        (!filters.hourlyRate ||
          tutor.price.includes(filters.hourlyRate))
      );
    });
    setTutors(filteredTutors);
  };

  const handleResetFilters = () => {
    setFilters({
      name: "",
      subjectsTaught: "",
      qualifications: "",
      hourlyRate: "",
    });
    setTutors(tutorsData); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/tutor-details/${id}`);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  return (
    <div className="tutor-cards-container">
      <h1>Find the tutors that fit your needs</h1>
      <p className="tagline">
        Discover experienced tutors for personalized learning and book
        one-to-one online lessons to fit your schedule.
      </p>
      <div className="filter-toggle">
          <div className="filter-panel">
            <h3>FILTER</h3>
            <div className="filter-input">
              <label>
                <b>SUBJECTS TAUGHT:</b>
              </label>
              <input
                type="text"
                name="subjectsTaught"
                value={filters.subjectsTaught}
                onChange={handleInputChange}
              />
            </div>
            <div className="filter-input">
              <label>
                <b> QUALIFICATIONS:</b>
              </label>
              <input
                type="text"
                name="qualifications"
                value={filters.qualifications}
                onChange={handleInputChange}
              />
            </div>
            <div className="filter-input">
              <label>
                <b>HOURLY RATE:</b>
              </label>
              <input
                type="text"
                name="hourlyRate"
                value={filters.hourlyRate}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-container-gettutor">
              <button onClick={handleFilter}>Apply Filters</button>
              <button onClick={handleResetFilters}>Reset Filters</button>
            </div>
          </div>
        
      </div>
      <div className="content-wrapper">
        <div className="tutor-cards">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="tutor-cards">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="tutor-card"
                  onClick={() => handleCardClick(tutor.id)}
                  onMouseEnter={() => setHoveredCard(tutor.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="tutor-card-content">
                    <div className="tutor-details">
                      <h3>{tutor.name}</h3>
                      <p>Subjects Taught: {tutor.subject}</p>
                      <p>Qualifications: {tutor.info}</p>
                      {hoveredCard === tutor.id && (
                        <div className="hourly-rate-box">
                          <p>{tutor.price}</p>
                          <div className="additional-info">
                            <p>
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: "#ffd700" }}
                              />{" "}
                              0 / 5
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TutorCards;
