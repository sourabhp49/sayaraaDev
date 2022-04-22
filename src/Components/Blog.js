import React from "react";
import "../style/Blog.scss";
import CardRoutes from "./Cardcontent";
import { Link } from "react-router-dom";
import cardero from "../images/cardero.png";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header";
import { connect } from "react-redux";
import { FetchdataBlog } from "../Service";
import moment from "moment";
// import blog1 from '../images/blog1.png'
// import blog3 from '../images/blog3.png'

const useStyles = makeStyles((theme) => ({
  card_style: {
    height: "40em",
    border: "0.01em solid #ece8e8",
  },
  card_body: {
    position: "relative",
  },
}));

const Blog = ({ FetchdataBlog, Blogtext }) => {
  //  const [cards,setCards] = useState()
  const [blogtexts, setBlogtext] = React.useState([]);
  const [latestread, setLatestread] = React.useState();
  const classes = useStyles();
  React.useEffect(() => {
    FetchdataBlog();
  }, []);
  React.useEffect(() => {
    if (Blogtext && Blogtext.Blog.Blogtext.data) {
      Blogtext.Blog.Blogtext.data.forEach((el) => {
        let day = moment(el.added_date).format("dddd");
        let date = moment(el.added_date).format("DD");
        let month = moment(el.added_date).format("MMMM");
        let year = moment(el.added_date).format("YYYY");
        let time = moment(el.added_date).format("hh:mm A");
        let dateAndTime =
          day + ", " + date + " " + month + " " + year + ", " + time;
        el["addeddate"] = dateAndTime;
      });
      setBlogtext(Blogtext.Blog.Blogtext.data);
      loadBlogBanerFirstChild(Blogtext.Blog.Blogtext.data[0]);
    }
  }, [Blogtext]);

  const loadBlogBanerFirstChild = (data) => {
    setLatestread(data);
  };

  const BlogtextCard = () =>
    blogtexts.map((data, i) => (
      <div>
        <div className={`${classes.card_style} card`} key={i}>
          <div className="card-header bg-white" key={i}>
            <img
              src={`https://sayaraagroup.com/${data.blog_image}`}
              alt="rover"
              className="mx-auto d-block"
            />
          </div>
          <div className="card-body">
            <div className={classes.card_body}>
              <span className="tag">car wash</span>
              <h4 className="card-heading mt-3">{data.title}</h4>
              <p
                className="card-para"
                dangerouslySetInnerHTML={{
                  __html: data.description.substring(0, 230),
                }}
              ></p>
            </div>
          </div>
          <div className="card-footer bg-white border border-white">
            <div className="date">
              <p className="dates">{data.addeddate}</p>
            </div>
            <div className="user-info">
              <Link
                className="link block-card-link"
                to={`/blog/${data.blog_alias}`}
                // onClick={() => loadBlogBanerFirstChild(data)}
              >
                Read More
                <img
                  src={cardero}
                  style={{ width: "20px", height: "auto" }}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));
  return (
    <>
      <div>
        <Header />
        {latestread && (
          <div className="blog-main">
            {/* <div className="left-blog">
        fgfdgdg
        </div> */}
            <div className="blog-right">
              <div className="content-div">
                {" "}
                <p className="blog-head">Latest read</p>
                <>
                  <h1 className="main-head">{latestread.title}</h1>
                  <p
                    className="blog-para"
                    dangerouslySetInnerHTML={{
                      __html: latestread.description.substring(0, 150),
                    }}
                  ></p>
                </>
                <div className="btn-group">
                  <button className="blog-btn">
                    <Link to={`/blog/Beyond_Car_Wash_And_More_An_App_For_All_That_Your_Car_Needs`} className='link-readmore'>Read More</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container">
          {BlogtextCard()}
          {/* <div className="card">
    <div className="card-header">
      <img src={blog2} alt="ballons" />
    </div>
    <div className="card-body">
      <span className="tag ">Car wash</span>
      <h4 className='card-heading'>
Beyond Car Wash And More: An App For All That Your Car Needs
      </h4>
      <p className='card-para'>
      A do-it-all app for your car. Sounds too good to believe? When everything from food to clothes is available at your fingertips, why not car services? For the first time in Abu Dhabi, we are bringing together all car-related...
      </p>
      <div className="user">
       <div className='date'><p className='dates'>05/11/2021</p></div>
        <div className="user-info">
         <Link className='link'>Read More <img src={cardero} style={{width:'20px' , height:'auto'}}/></Link>
         
        </div>
      </div>
    </div>
  </div> */}
          {/* <div className="card">
    <div className="card-header">
      <img src={blog3} alt="city" />
    </div>
    <div className="card-body">
      <span className="tag">Car wash</span>
      <h4 className='card-heading'>
Beyond Car Wash And More: An App For All That Your Car Needs
      </h4>
      <p className='card-para'>
      A do-it-all app for your car. Sounds too good to believe? When everything from food to clothes is available at your fingertips, why not car services? For the first time in Abu Dhabi, we are bringing together all car-related...
      </p>
      <div className="user">
       <div className='date'><p className='dates'>05/11/2021</p></div>
        <div className="user-info">
         <Link className='link'>Read More <img src={cardero} style={{width:'20px' , height:'auto'}}/></Link>
         
        </div>
      </div>
    </div>
  </div> */}
        </div>
      </div>
    </>
  );
};
// export default Blog

const mapstate = (state) => {
  return {
    Blogtext: state,
  };
};
const mapDispatchprops = (dispatch) => {
  return {
    FetchdataBlog: () => {
      dispatch(FetchdataBlog());
    },
  };
};

export default connect(mapstate, mapDispatchprops)(Blog);
