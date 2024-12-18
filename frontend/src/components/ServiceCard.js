const ServiceCard = ({ place, service, rating }) => {
  return (
    <div className="service-card">
      <div className="place">{place}</div>
      <div className="service">{service}</div>
      <div className="rating">
        <div className="number">{rating}</div>
        <div className="material-symbols-rounded">star</div>
      </div>
    </div>
  );
};

export default ServiceCard;
