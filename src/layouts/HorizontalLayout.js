// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/HorizontalLayout';

// ** Menu Items Array
import navigation from '@src/navigation/horizontal';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

const HorizontalLayout = (props) => {
  const location = useLocation();
  console.log('location?.state: ', location?.state);
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  return (
    <Layout menuData={navigation} {...props}>
      {props.children}
    </Layout>
  );
};

export default HorizontalLayout;
