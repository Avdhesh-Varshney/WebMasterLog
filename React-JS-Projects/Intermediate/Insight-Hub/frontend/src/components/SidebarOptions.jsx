import { Add } from "@material-ui/icons";
import React from "react";
import "./css/SidebarOptions.css";

function SidebarOptions() {
  return (
    <div className="sidebarOptions">
      <div className="sidebarOption">
        <img
          src="https://cdn.pixabay.com/photo/2014/01/18/10/14/vaulted-cellar-247391_640.jpg"
          alt=""
        />
        <p>History</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://media.istockphoto.com/id/1418476287/photo/businessman-analyzing-companys-financial-balance-sheet-working-with-digital-augmented-reality.webp?b=1&s=612x612&w=0&k=20&c=DfSCIoYtn5f7WcEwsZR-CtA9tY5dEA45rKs60yIKjJU="
          alt=""
        />

        <p>Business</p>
      </div>
      <div className="sidebarOption">
        <img
          src="https://cdn.pixabay.com/photo/2023/07/04/07/25/self-consciousness-8105584_1280.jpg"
          alt=""
        />
        <p>Psychology</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://media.istockphoto.com/id/1390248034/photo/cute-girl-chef-in-uniform-holding-a-platter-or-cloche-restaurant-cook-mascot-on-pink.webp?b=1&s=612x612&w=0&k=20&c=ZQnKOzWEMuN4mLFs2mnPCL-T_K_-K92WwqGtN3zCXEc="
          alt=""
        />
        <p>Cooking</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://media.istockphoto.com/id/1451301857/photo/golden-3d-podcast-icon-isolated-on-white-background-3d-illustration.webp?b=1&s=612x612&w=0&k=20&c=eZ0qZYVFAzCmADDh_1MeiFKslmJiUdq8OtaRgJyoxnc="
          alt=""
        />
        <p>Music</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://media.istockphoto.com/id/1414916333/photo/metaverse-and-future-digital-technology-businessman-hand-holding-virtual-global-internet.webp?b=1&s=612x612&w=0&k=20&c=ueEp0T1gwfnNfRlp7eA9uNi9Jd8ths6rs3gazPVWhq0="
          alt=""
        />
        <p>Science</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_640.jpg"
          alt=""
        />
        <p>Health</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://media.istockphoto.com/id/534129330/photo/reel-of-film.webp?b=1&s=612x612&w=0&k=20&c=pd3Ffmr2fvmR_oluTItBnBOjIONA2RNsnUwPePJVdIM="
          alt=""
        />
        <p>Movies</p>
      </div>

      <div className="sidebarOption">
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <p>Technology</p>
      </div>

      <div className="sidebarOption">
        <img
          src="data:image/png;base64,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"
          alt=""
        />
        <p>Education</p>
      </div>
      <div className="sidebarOption">
        <Add />
        <p className="text">Discover Spaces</p>
      </div>
    </div>
  );
}

export default SidebarOptions;