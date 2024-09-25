import Header from '~/containers/Header';
import Footer from '~/containers/Footer';
import Navigate from '~/components/Client/Navigate/Navigate';

const mainSection = {
    position: 'relative',
};

const DefaultLayout = ({ children }) => {
    return (
        <div style={mainSection}>
            <Header />
            <Navigate />
            {children}
            <Footer />
        </div>
    );
};

export default DefaultLayout;
