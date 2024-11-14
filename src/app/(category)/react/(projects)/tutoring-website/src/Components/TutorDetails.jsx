import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaGithub, FaPhone } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./TutorDetails.css";
import tutors from "../data/data";

function TutorDetails() {
  const { tutorId } = useParams();
  const [showFullBio, setShowFullBio] = useState(false);
  const [messageContent, setMessageContent] = useState(
    `Hi, I'm looking for a tutor. Would you be available for a free meeting? I'd like to connect with you. I look forward to a positive reply!`
  );
  const [messageSent, setMessageSent] = useState(false);

  const tutor = tutors.find((t) => String(t.id) === String(tutorId));

  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

  const sendMessage = () => {
    setMessageSent(true);
    setMessageContent("");
  };

  const [iconClicked, setIconClicked] = useState(false);

  const toggleMargin = () => {
    setIconClicked(!iconClicked);
  };

  const handleChangeMessage = (e) => {
    const newValue = e.target.value;
    if (
      !newValue.startsWith(
        `Hi, I'm looking for a tutor. Would you be available for a free meeting? I'd like to connect with you. I look forward to a positive reply!`
      )
    ) {
      setMessageContent(newValue);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.detailsContainer}>
        {!tutor ? (
          <p style={styles.message}>Tutor not found</p>
        ) : (
          <div className="tutordetailsdivcontainer">
            <div className="left-container-tutordetails">
              <div className="upperdetails">
                <div className="upperinfo">
                  <div className="tutordetailsprofilename">
                  <img
                      src={tutor.image}
                      alt={`${tutor.name}'s profile`}
                      className="tutordetailsprofilepic"
                    />
                    <h3>
                      <b>{tutor.name}</b>
                    </h3>
                  </div>
                  <div className="upperinfo1">
                    <div className="qualifications">
                      Qualifications: {tutor.qualifications}
                    </div>
                    <div className="location">
                      Location: {tutor.location}
                    </div>
                  </div>
                </div>
                <div className="price">
                  <span>{tutor.price}</span>
                </div>
              </div>
              <div className="bio">
                <h5 style={{ marginBottom: iconClicked ? "5px" : "0px" }}>
                  About me
                </h5>
                {showFullBio ? tutor.bio : `${tutor.bio.slice(0, 100)}...`}
                <button
                  className="tutordetailsshowmoreless"
                  onClick={() => {
                    toggleBio();
                    toggleMargin();
                  }}
                >
                  {showFullBio ? (
                    <FontAwesomeIcon icon={faAngleUp} id="b1234567890" />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} id="b1234567890" />
                  )}
                </button>
              </div>
              <div className="socials">
                <h5>My socials</h5>
                <div className="links">
                  <a
                    href={tutor.linkedinId}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={tutor.githubAccount}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                  <div className="number">
                    <FaPhone /> +91-{tutor.phoneNumber}
                  </div>
                </div>
              </div>
              <div className="reviews">
                <h5>My reviews</h5>
                {tutor.reviews.length === 0 ? (
                  <p>
                    <span className="zero">0</span> reviews yet
                  </p>
                ) : (
                  tutor.reviews.map((review, index) => (
                    <div key={index}>
                      <p>{review}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="subjects">
                <h5>Subjects offered</h5>
                <ul>
                  {tutor.subjectsTaught.map((subject, index) => (
                    <Link
                      key={index}
                      to={`/seltutor?subject=${subject}`}
                      className="subject-link"
                    >
                    {subject}{", "}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div className="spacing"></div>
            <div className="right-container-tutordetails">
              <h4>
                Send <i>{tutor.name}</i> a Message
              </h4>
              <textarea
                placeholder={`Hi, I'm looking for a tutor. Would you be available for a free meeting? I'd like to connect with you. I look forward to a positive reply!`}
                rows={8}
                style={{ width: "100%", marginBottom: "10px" }}
                value={messageContent}
                onChange={handleChangeMessage}
              ></textarea>
              <button
                className="sentmesssage-tutordetails"
                style={{ width: "100%" }}
                onClick={sendMessage}
              >
                Send Message
              </button>
              {messageSent && (
                <p className="messagesucessfully-tutordetails">
                  Message sent successfully!
                </p>
              )}
              <div className="estimatedtime">Estimated Time: 24hrs</div>
            </div>
          </div>
        )}
      </div>
      <div style={styles.spacing}></div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
  },
  detailsContainer: {
    width: "90%",
    display: "inline-block",
    textAlign: "left",
    verticalAlign: "top",
  },
  spacing: {
    width: "50px",
    display: "inline-block",
  },
  message: {
    fontSize: "18px",
    color: "red",
  },
};

export default TutorDetails;
