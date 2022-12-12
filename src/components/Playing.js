
import "./player.css";
import {
  Image,
  Segment,
  Grid,
  Button,
  Header,
  Icon,
  Label,
} from "semantic-ui-react";
import photo1 from "../Asserts/photo1.jpg";
import {  useRecoilState } from "recoil";
import { activeTrack } from "./TrackState";
import { useState } from "react";



const Playing = () => { 
const [active] = useRecoilState(activeTrack)
const [playing,setPlaying] = useState("PLAY")


  return (
    <>
   
      <div>
        <Segment id="player">
          <Grid columns={2}>
            <Grid.Column>
              <Label color="orange">
                NOW PLAYING
              </Label>
              <br />
              <br />
              <Header as="h1" floated="left">
                Playing
              </Header>
              <br />
              <br />
              <br />
              <Header as="h2" floated="left">
              {active.title} (----)
              </Header>
              <br />
              <br />
              <audio
              id="song"
                controls
                style={{ float: "left" }}
                controlsList="nodownload noplaybackrate"
              >
                <source src={active.downloadableUrl}/></audio>
            </Grid.Column>
            <Grid.Column>
              <div
                style={{
                  float: "right",
                }}
              >
                <Image src={photo1} alt="photo1" width="200px" />
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
        <Header as="h2" id="player-details" floated="left">
          {active.title}- <span>statistics</span>
          <div>
          <Icon
            name="download"
            size="small"
            style={{ marginLeft:"-8em" }}
          ></Icon>
          0<Icon name="share" size="small"></Icon>0
        </div>
        </Header>
        <br />
        <br />
       
        <br />
        <br />
        <Button
          color="orange"
          compact
          size="tiny"
          floated="left"
          id="player-details"
          onClick={(()=>{
            document.getElementById('song').play()
            setPlaying("PAUSE")
            if(playing==="PAUSE"){
              document.getElementById('song').pause()
              setPlaying("PLAY")
            }
          })}
        >
          {playing}
        </Button>
        <br />
        <br />
        <Button
          color="orange"
          compact
          size="tiny"
          floated="left"
          id="player-details"
        >
          DOWNLOAD NOW
        </Button>
      </div>
    </>
  );
};

export default Playing;
