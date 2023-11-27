export const CommunityLoading = () => {
  return (
    <div className="community-wrapper">
      <div className="community-top">
        <div>
          <div className="skeleton-avator-sm"></div>
          <h1 className="skeleton-community"></h1>
        </div>
      </div>
      <div className="community-bottom">
        <span className="subscribers skeleton-description"></span>
        <span className="subscribers skeleton-description"></span>
      </div>
    </div>
  );
};
