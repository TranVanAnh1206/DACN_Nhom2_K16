import Header from '~/containers/Header';
import Footer from '~/containers/Footer';

const mainSection = {
    position: 'relative',
};

const NoNavbarLayout = ({ children }) => {
    return (
        <div style={mainSection}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default NoNavbarLayout;
