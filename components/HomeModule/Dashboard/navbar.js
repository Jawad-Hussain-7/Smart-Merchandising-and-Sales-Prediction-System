import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import RentDashboard from './rentDashboard'
import BuyDashboard from "./buyDashboard"

const TabNavigator = createMaterialTopTabNavigator(
    {
        Rent:RentDashboard,
        Buy:BuyDashboard,
    },
    {
        navigationOptions:{
            swipeEnabled:true,
        },
        tabBarOptions: {
            activeTintColor: '#008080',
            inactiveTintColor: '#4c516d',
            labelStyle: {
                fontSize: responsiveFontSize(1.5),
            },
            tabStyle: {
                width: responsiveWidth(50),
            },
            style: {
                backgroundColor: 'white',
                borderWidth:responsiveWidth(0.3),
                borderTopColor:'#c6c8cc',
                borderRightColor:'transparent',
                borderLeftColor:'transparent',
                borderBottomColor:'transparent',
            },
            indicatorStyle:{
                backgroundColor:'#008080',
                height:responsiveHeight(0.4)
            }
        }
    }
);

const Navbar = createAppContainer(TabNavigator) 
export default Navbar