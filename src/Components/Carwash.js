import * as React from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import washcard from "../images/washcard.png";
import "../style/Carwash.scss";
import { useSelector,useDispatch } from 'react-redux';
import { FetchdataCarlist } from "../Service";
import Star from "../images/Star 1.png";
import { makeStyles } from "@material-ui/core/styles";
import Spiner from './Spiner'
const useStyles = makeStyles((theme) => ({
  carwash_price: {
    fontSize: "0.6em",
    marginBottom: "0.8em",
    color: "black",
  },
  carash_type: {
    color: "black",
  },
  bottomprice_parent: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    position: "relative",
  },
  bottomprice_child: {
    width: "20%",
    textAlign: "center",
    marginBottom: "0.6em",
  },
  price_rating_style: {
    display: "flex",
    // padding: "-0.8em",
    left: "-1.5em",
    position: "relative",
  },
  rating_img: {
    height: "0.5em",
    width: "auto",
    marginBottom: '4px'
  },
  rating_parent: {
    display: "flex",
    // opacity: "0.7",
    background: "#fef7f1",
    borderRadius: "14%",
  },
}));

const CarWash = ({ search }) => {
  const dispatch = useDispatch();
 
  console.log(search, "searchTitle");
  const [imageslides, setSlides] = React.useState([]);
  const [isLoading,setIsLoading] = React.useState('');
  const classes = useStyles();
  React.useEffect(() => {
    dispatch(FetchdataCarlist());
  }, []);
  const Carwashlist = useSelector((state) => state.CarwashList.CarwashList);
  const Isloading = useSelector((state) => state.CarwashList.loading);
  console.log(Isloading,'isLoading111111')


//   console.log(Carwashlist && Carwashlist.CarwashList && Carwashlist.CarwashList.loading,'Isloading')
  // const CarproductList = useSelector((state) => state.CarProductList.CarproductList);

  React.useEffect(() => {
    if (Carwashlist && Carwashlist.data) {
      setSlides(Carwashlist.data);
    }
  }, [Carwashlist]);
  const Carwashlists = () =>
    imageslides
      .filter((value) => {
        if (search === "") {
          return value;
        } else if (
          value.service_name.toLowerCase().includes(search.toLowerCase())
        ) {
          return value;
        }
      })
      .map((carwashlist, i) => (
        <div>
          <Grid container spacing={2} className="main" key={i}>
            <Grid item xs={12} md={4} xl={4}>
              <div>
                <div className="car-img-div">
                  <img src={washcard} alt="" />
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={8} xl={8}>
              <div>
                <div className="card-heading ">
                  {/* <h1>Exterior Wash</h1> */}
                  <h1>{carwashlist.company_name}</h1>
                  <h1>{carwashlist.service_name}</h1>
                  <div className="card-ratings-withcontent">
                    <div className="para-style-carwash">
                      {/* <p>By Almjra car wash, Opposite EMC, Musaffah-5 | 2 kms</p> */}
                      {/* <p>{carwashlist.description}</p> */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: carwashlist.description,
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className={classes.price_rating_style}>
                  <div className={classes.bottomprice_parent}>
                    {carwashlist.body_data.map((carwash_pricing) => (
                      <div className={classes.bottomprice_child}>
                        <span className={classes.carash_type}>
                          {carwash_pricing.body_type}
                        </span>
                        <br />
                        <span className={classes.carwash_price}>
                          AED {carwash_pricing.final_amount}
                        </span>{" "}
                        <br />
                      </div>
                    ))}
                  </div>
                  {/* <div>
                    <div className={classes.rating_parent}>
                      <div className="pl-2">
                        <img className={classes.rating_img} src={Star} alt="" />
                      </div>
                      <span class="badge badge-light">
                        {parseInt(carwashlist.vendor_rate)}/5
                      </span>
                    </div>
                  </div> */}
                  <div className="card-ratings-withcontent1">
                    <div className="ratings-div1">
                      <div className="ratingswithcontent-div1">
                        <div className="rate-flex1 rate-flex2">
                          <img src={Star} alt="" />
                        </div>
                        <div>
                          <p className="rates1 rates2 ">{parseInt(carwashlist.vendor_rate)}/5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} mb={5}>
              <div className="border"></div>
            </Grid>
          </Grid>
        </div>
      ));
  return (
    <>
      <div>{Isloading ? <Spiner/> : Carwashlists()}</div>
    </>
  );
};

// const mapstate = (state) => {
//   return {
//     Carwashlist: state,
//   };
// };

// const mapDispatchprops = (dispatch) => {
//   return {
//     FetchdataCarlists: () => {
//       dispatch(FetchdataCarlist());
//     },
//   };
// };

export default CarWash;
