import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Image } from "semantic-ui-react";
import photo1 from "../Asserts/photo1.jpg";
import Pagination from "./Pagination";
import "./songlist.css";
import data from "../data/data";
import { activeTrack } from "./TrackState";
import { useRecoilState } from "recoil";

export default function SongList() {
  const [songsArray] = useState(data.details.rows);
  const [currentPage, setCurrentPage] = useState(1);
  const [tracksPerPage] = useState(4);
  const indexOfLastTrack = currentPage * tracksPerPage;
  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
  const currentTracks = songsArray.slice(indexOfFirstTrack, indexOfLastTrack);

  const [trackInfo, setTrackInfo] = useRecoilState(activeTrack);

  function getActiveUrl(title, downloadableUrl) {
    setTrackInfo({ title, downloadableUrl });
    localStorage.setItem("trackinfo", trackInfo);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Grid centered container>
        <Grid.Row columns={4}>
          {currentTracks.map((track) => {
            return (
              <Grid.Column key={track.title}>
                <div>
                  <div
                    style={{
                      border: "15px solid  #e0e5e5",
                      borderRadius: "20px",
                      width: "200px",
                      padding: "5px",
                      boxShadow: "2px 2px 8px -3px",
                    }}
                  >
                    <Image src={photo1} alt="photo1" width="200px" />
                  </div>
                  <p className="song-title">{track.title}- </p>
                  {/* buttons */}
                  <Link to={track.title}>
                    <Button
                      compact
                      color="orange"
                      size="mini"
                      onClick={() => getActiveUrl(track.title, track.url)}
                    >
                      PLAY NOW
                    </Button>
                  </Link>

                  <Link to={track.url}>
                    <Button compact color="orange" size="mini">
                      DOWNLOAD NOW
                    </Button>
                  </Link>
                </div>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
      <hr
        style={{
          marginTop: "40px",
          marginLeft: "250px",
          marginRight: "250px",
        }}
      />

      <Pagination
        postsPerPage={tracksPerPage}
        totalPosts={songsArray.length}
        paginate={paginate}
      />
    </>
  );
}
