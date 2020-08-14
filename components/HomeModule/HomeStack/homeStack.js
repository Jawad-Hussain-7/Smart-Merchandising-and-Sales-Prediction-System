import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Dashboard from '../Dashboard/dashboard'
import Ads from '../../CommonModules/Ads/ads'
import NewElectronicHardwareAd from '../NewElectronicHardwareAd/newElectronicHardwareAd'
import NewVehicleAd from '../NewVehicleAd/newVehicleAd'
import NewHouseAd from '../NewHouseAd/newHouseAd'
import Broadcast from '../Broadcast/broadcast'
import Search from '../../CommonModules/Search/search'
import LocationPicker from '../../CommonModules/LocationPicker/locationPicker'
import RatingsAndReviews from '../../CommonModules/RatingsAndReviews/ratingsAndReviews'
import EditProfile from '../../AccountModule/EditProfile/editProfile'
import Chat from '../../ChatModule/Chat/chat'
import Outlet from '../Outlet/outlet'
import SearchResults from '../../CommonModules/SearchResults/searchResults'

const dashboardStack= createStackNavigator(
  {
    Dashboard:Dashboard,
    EditProfile:EditProfile,
    NewVehicleAd:NewVehicleAd,
    NewHouseAd:NewHouseAd,
    Broadcast:Broadcast,
    Search:Search,
    Ads:Ads,
    NewElectronicHardwareAd:NewElectronicHardwareAd,
    LocationPicker:LocationPicker,
    RatingsAndReviews:RatingsAndReviews,
    Chat:Chat,
    Outlet:Outlet,
    SearchResults:SearchResults,
  },
  {
    defaultNavigationOptions:
    {
      header:null
    }
  }
);
const DashboardNavigator=createAppContainer(dashboardStack)

export default class DashboardStack extends Component {
  render(){
    return(
      <DashboardNavigator/>
    )
  }
}