import { HomeFormView, UserNotFoundView, PortfolioView } from '@views';
import { StyledMainContainer } from '@common/styles';
import PortfolioLayout from '@layouts/portfolio';
import HomeLayout from '@layouts/home';
import buildUser from '@lib/user-builder';
import { useChangeRootColor } from '@hooks';
import { isEnabledUser } from '@utils/user-mapping';
import { IS_PORTFOLIO } from '@lib/constants';
import PropTypes from 'prop-types';

export async function getStaticProps() {
  const username = process.env.NEXT_PUBLIC_USERNAME;
  if (IS_PORTFOLIO) {
    const params = { username };
    const user = await buildUser(params);
    return {
      props: {
        user,
      },
    };
  }
  return {
    props: {
      user: null,
    },
  };
}

const IndexPage = ({ user }) => {
  if (user) {
    if (!isEnabledUser(user)) {
      return <UserNotFoundView username={user?.username} />;
    }
    useChangeRootColor(user.primaryColor);
    return <PortfolioView user={user} />;
  }
  return (
    <StyledMainContainer className="fillHeight">
      <HomeFormView />
    </StyledMainContainer>
  );
};

IndexPage.Layout = IS_PORTFOLIO ? PortfolioLayout : HomeLayout;

IndexPage.propTypes = {
  user: PropTypes.object,
};
export default IndexPage;
