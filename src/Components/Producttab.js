import React ,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import Spiner from './Spiner';
import { useSelector,useDispatch } from 'react-redux';
import {FetchdataCarproductlist} from '../Service'
import Grid from '@mui/material/Grid';
import '../style/Carservice.scss';
import Star from '../images/Star 1.png'


const Producttab = ({search})=>{
  const dispatch = useDispatch();
    const [productlist,setProductlist] = useState([])
    useEffect(()=>{
      dispatch(FetchdataCarproductlist())
    },[]);
 
    const CarproductList = useSelector((state) => state.CarProductList.CarproductList);
    const Isloading = useSelector((state) => state.CarProductList.loading);
    useEffect(()=>{
        if(CarproductList && CarproductList.data){
            setProductlist(CarproductList.data)
        }
    },[CarproductList])

    const Productlistshow = ()=>
    productlist.filter((value) => {
        if (search === "") {
          // // searchTerm is in scope?
          return value;
        } else if (
          value.service_name.toLowerCase().includes(search.toLowerCase())
        ) {
          return value; // would be better to do: return true;
        }
      }).map((list,index)=>( 
        <Grid container spacing={2} className='main1' key={index}> 
        <Grid item  xs={12} md={4} xl={4}>
            <div>
              <div className='car-img-div1'>
                  <img src={`https://sayaraagroup.com/${list.image}`} style={{borderRadius:"15px"}} alt=''/>
              </div>
          </div>
        </Grid>
        <Grid item  xs={12} md={8} xl={8}>
          <div>
              <div className='card-heading1 '>
              <div className='card-main-heading1'>
                      <div>
                      {/* <h1>Wheel Balance</h1> */}
                      <h1 style={{lineHeight:'27px'}}>{list.company_name}</h1>
                      <h2 style={{lineHeight:'31px'}} className='modal-cell'>{list.service_name}</h2>
                      <h3 style={{lineHeight:'31px'}} className='additional-service'>{list.additional_sub_service_name}</h3>
                      <p>{`width : ${list.width} and height : ${list.height} and rim size ${list.rim_size}`}</p>
                      </div>
                      <div className='add-div1'>
                          {/* <p className='add-para1'>AED 100</p> */}
                          <p className='add-para1' >AED {list.price}</p>
                          {/* <p className='line1'>AED 100</p> */}
                      </div>
                  </div>
                  
                  <div className='card-ratings-withcontent1'>
                      <div>
                      <p dangerouslySetInnerHTML={{ __html: list.service_details}}></p>
                      <p dangerouslySetInnerHTML={{ __html: list.vendor_complimentry}}></p>
                      <p dangerouslySetInnerHTML={{ __html:`vendor year : ${ list.vendor_year}`}}></p>
                      </div>
                      <div className='ratings-div1'>
                         <div className='ratingswithcontent-div1'>
                             <div className='rate-flex1'> <img  src={Star} alt=''/></div>
                             <div><p className='rates1'>4/5</p></div>
                         </div>
                      </div>
                  </div>
                 
                  {/* <div className='cardwash-list1'>
                      <div className='cardwash-listimgdiv1'>
                          <img src={Right}  alt=''/>
                      </div>
                      <div className='carwash-contentlist1'>
                        <p>Service at doorstep & workstation</p>
                      </div>
                  </div>
                  <div className='cardwash-list1'>
                      <div className='cardwash-listimgdiv1'>
                          <img src={Right}  alt=''/> 
                      </div>
                      <div className='carwash-contentlist1'>
                        <p>Packages are available</p>
                      </div>
                  </div>
                  <div className='cardwash-list1'>
                      <div className='cardwash-listimgdiv1'>
                          <img src={Right}  alt=''/>
                      </div>
                      <div className='carwash-contentlist1'>
                        <p>Complementary services</p>
                      </div>
                  </div> */}
              </div>
          </div>
         
        </Grid>
        
        <Grid item xs={12} mb={5}>
        <div className='border1'>
        
        </div>
        </Grid>
    
      </Grid>
    ))
    return(
        <>
        <div>{Isloading ? <Spiner /> :  Productlistshow()}</div>
     
        </>
    )
}

  
  export default Producttab;