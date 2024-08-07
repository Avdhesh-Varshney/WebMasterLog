"use client";
import SubCard from "./SubCard";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SubjectDetail {
  attended: number;
  total: number;
  Sub_name: string;
  target_percentage: number;
}
const initialSubjectDetails: SubjectDetail[] = [
  // {
  //   attended: 4,
  //   total: 6,
  //   Sub_name: "DSA",
  //   target_percentage: 75,
  // },
  // {
  //   attended: 9,
  //   total: 9,
  //   Sub_name: "DASA",
  //   target_percentage: 75,
  // },
];

interface HomeProps {
  logout: () => void;
  user: any;
  userData: any;
  Id: any;
}

const Home: React.FC<HomeProps> = ({ logout, user, userData, Id }) => {
  const [toggle, setToggle] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isData, setIsData] = useState(false);
  const [subjectDetails, setSubjectDetails] = useState(initialSubjectDetails);
  const [userId, setUserId] = useState(Id);
  useEffect(() => {
    if (userData) {
      setSubjectDetails(userData.Attendance || initialSubjectDetails);
      setUserId(userData.uid);
    }
  }, [userData]);

  useEffect(() => {
    if (subjectDetails.length === 0) {
      setIsData(false);
    } else {
      setIsData(true);
    }
  }, [subjectDetails]);

  const updateUserAttendance = async () => {
    try {
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, { Attendance: subjectDetails }, { merge: true });
      toast.success("Attendance updated!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setHasChanges(false);
    } catch (error) {
      toast.error("Failed to update details!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const markPresent = (index: number) => {
    const newDetails = [...subjectDetails];
    newDetails[index].attended += 1;
    newDetails[index].total += 1;
    setSubjectDetails(newDetails);
    setHasChanges(true);
  };

  const markAbsent = (index: number) => {
    const newDetails = [...subjectDetails];
    newDetails[index].total += 1;
    setSubjectDetails(newDetails);
    setHasChanges(true);
  };
  const changeName = (index: number, newName: string) => {
    const newDetails = [...subjectDetails];
    newDetails[index].Sub_name = newName;
    setSubjectDetails(newDetails);
    setHasChanges(true);
  };
  const setTotal = (index: number, total: number) => {
    const newDetails = [...subjectDetails];
    newDetails[index].total = total;
    setSubjectDetails(newDetails);
    setHasChanges(true);
  };
  const setPresents = (index: number, present: number) => {
    const newDetails = [...subjectDetails];
    newDetails[index].attended = present;
    setSubjectDetails(newDetails);
    setHasChanges(true);
  };
  const addSubjectDetail = (newDetail: {
    Sub_name: string;
    target_percentage: number;
    attended: number;
    total: number;
  }) => {
    const newDetails = [...subjectDetails, newDetail];
    setSubjectDetails(newDetails);
    setHasChanges(true);
  };
  const deleteSubject = (index: number) => {
    const newDetails = [...subjectDetails];
    newDetails.splice(index, 1);
    setSubjectDetails(newDetails);
    setHasChanges(true);
  };
  return (
    <main className="flex flex-col justify-between w-full bg-zinc-900 text-zinc-300 relative">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <nav className="flex items-center h-[60px] justify-between p-4 bg-zinc-800 relative">
        <div className="flex items-center gap-2">
          <img src="/assets/images/logo.png" alt="logo" className="w-12 mr-2" />
          <span className="text-2xl font-semibold">Attendance Tracker</span>
        </div>
        <button className="text-zinc-300" onClick={() => setToggle(!toggle)}>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 16.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0-6c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0-6c.828 0 1.5-.672 1.5-1.5S12.828 1.5 12 1.5 10.5 2.172 10.5 3s.672 1.5 1.5 1.5z" />
          </svg>
        </button>
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-16 right-0 mx-4 my-2 min-w-[140px] rounded-xl animated-slide-top`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <li
              className={`font-poppins font-regular cursor-pointer text-[16px] mb-4 text-white text-dimWhite py-1 px-2`}
            >
              <a href="/">Set Target</a>
            </li>
            <li
              className={`font-poppins font-regular cursor-pointer text-[16px] mb-4 text-white text-dimWhite py-1 px-2`}
            >
              <a href="/">Add Subject</a>
            </li>

            <li className="text-white bg-red-800 py-1 px-2 rounded-[25px] font-poppins font-medium cursor-pointer text-[16px]">
              <button onClick={logout} className="p-2">
                Log Out?
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="w-full mt-10 mb-10">
        {hasChanges && (
          <button
            className="absolute top-[70px] right-4 p-1 rounded-lg text-white font-poppins font-medium text-[14px] bg-[#098500] hover:bg-[#086d00] transition-all duration-300 ease-in-out"
            onClick={updateUserAttendance}
          >
            Save Changes
          </button>
        )}
        <Modal
          isOpen={isOpen}
          setOpen={setIsOpen}
          addSubject={(newDetail: {
            Sub_name: string;
            target_percentage: number;
            attended: number;
            total: number;
          }) => addSubjectDetail(newDetail)}
        />
        {!isData ? (
          <div className="flex flex-col w-full items-center gap-4 p-4  bg-zinc-900 text-[#949494] font-poppins">
            <p className="mb-4">No records to display</p>
            <div className="flex flex-col items-center">
              <button onClick={() => setIsOpen(true)}>
                <svg
                  className="w-[200px] h-[200px] mb-8"
                  viewBox="0 0 254 253"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_397_105)">
                    <path
                      d="M139.65 113.85H190.25V139.15H139.65V189.75H114.35V139.15H63.75V113.85H114.35V63.25H139.65V113.85ZM127 253C93.4501 253 61.2743 239.672 37.551 215.949C13.8276 192.226 0.5 160.05 0.5 126.5C0.5 92.9501 13.8276 60.7743 37.551 37.051C61.2743 13.3276 93.4501 0 127 0C160.55 0 192.726 13.3276 216.449 37.051C240.172 60.7743 253.5 92.9501 253.5 126.5C253.5 160.05 240.172 192.226 216.449 215.949C192.726 239.672 160.55 253 127 253ZM127 227.7C153.84 227.7 179.581 217.038 198.559 198.059C217.538 179.081 228.2 153.34 228.2 126.5C228.2 99.6601 217.538 73.9195 198.559 54.9408C179.581 35.9621 153.84 25.3 127 25.3C100.16 25.3 74.4195 35.9621 55.4408 54.9408C36.4621 73.9195 25.8 99.6601 25.8 126.5C25.8 153.34 36.4621 179.081 55.4408 198.059C74.4195 217.038 100.16 227.7 127 227.7Z"
                      fill="#282B36"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_397_105">
                      <rect
                        width="253"
                        height="253"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <p className="text-xl text-center">
                Click on Add button to add a new subject
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 content-start p-4  bg-zinc-900 text-[#949494] font-poppins">
            {subjectDetails.map((subject: any, index: any) => (
              <SubCard
                key={index}
                Sub_name={subject.Sub_name}
                attended={subject.attended}
                total={subject.total}
                target_percentage={subject.target_percentage}
                markPresent={() => markPresent(index)}
                markAbsent={() => markAbsent(index)}
                changeName={(newName: string) => changeName(index, newName)}
                setTotal={(total: number) => setTotal(index, total)}
                setPresent={(present: number) => setPresents(index, present)}
                deleteSubject={() => deleteSubject(index)}
              />
            ))}

            <div className="w-full flex items-center justify-center">
              <button onClick={() => setIsOpen(true)}>
                <svg
                  className="w-[50px] h-[50px] my-8 cursor-pointer"
                  viewBox="0 0 254 253"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_397_105)">
                    <path
                      d="M139.65 113.85H190.25V139.15H139.65V189.75H114.35V139.15H63.75V113.85H114.35V63.25H139.65V113.85ZM127 253C93.4501 253 61.2743 239.672 37.551 215.949C13.8276 192.226 0.5 160.05 0.5 126.5C0.5 92.9501 13.8276 60.7743 37.551 37.051C61.2743 13.3276 93.4501 0 127 0C160.55 0 192.726 13.3276 216.449 37.051C240.172 60.7743 253.5 92.9501 253.5 126.5C253.5 160.05 240.172 192.226 216.449 215.949C192.726 239.672 160.55 253 127 253ZM127 227.7C153.84 227.7 179.581 217.038 198.559 198.059C217.538 179.081 228.2 153.34 228.2 126.5C228.2 99.6601 217.538 73.9195 198.559 54.9408C179.581 35.9621 153.84 25.3 127 25.3C100.16 25.3 74.4195 35.9621 55.4408 54.9408C36.4621 73.9195 25.8 99.6601 25.8 126.5C25.8 153.34 36.4621 179.081 55.4408 198.059C74.4195 217.038 100.16 227.7 127 227.7Z"
                      fill="#282B36"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_397_105">
                      <rect
                        width="253"
                        height="253"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Home;
