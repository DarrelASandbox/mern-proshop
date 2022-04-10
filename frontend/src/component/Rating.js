const Rating = ({ value, text, color }) => {
  const star = [...Array(5)].map((_, i) => {
    const className =
      value >= i + 1
        ? 'fas fa-star' //full star
        : value >= i + 0.5
        ? 'fas fa-star-half-alt' //half star
        : 'far fa-star'; //empty star

    return <i key={'Star' + i} style={{ color }} className={className} />;
  });

  return (
    <div className='rating'>
      {star}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = { color: '#f8e825' };

export default Rating;
