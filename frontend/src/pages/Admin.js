import { useEffect } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";

import { getAnalytics, getFeedbacks } from "../utils/api";

// contexts
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { useFeedbackContext } from "../hooks/useFeedbackContext";
import { useAnalyticsContext } from "../hooks/useAnalyticsContext";

// components
import UniversalChart from "../components/UniversalChart";
import ServiceCard from "../components/ServiceCard";

const Admin = () => {
  const { user } = useAuthenticationContext();
  const { feedbacks, dispatch: feedbacksDispatch } = useFeedbackContext();
  const {
    average_ratings,
    submission_trend,
    dispatch: analyticsDispatch,
  } = useAnalyticsContext();

  useEffect(() => {
    if (user) {
      getAnalytics(user.token, analyticsDispatch);
    }
  }, [user, analyticsDispatch]);

  const getTop5 = () => {
    const sortedRatings = [...average_ratings];
    sortedRatings.sort((a, b) => b.average_rating - a.average_rating);
    return sortedRatings.slice(0, 5);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    if (user) {
      let csvContent;

      if (feedbacks.length === 0) {
        const { isResponseOkay, data } = await getFeedbacks(
          user.token,
          feedbacksDispatch
        );

        if (!isResponseOkay) {
          throw new Error(data.error);
        }

        csvContent = Papa.unparse(data);
      } else {
        csvContent = Papa.unparse(feedbacks);
      }

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      saveAs(blob, "feedbacks.csv");
    }
  };

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>

      <button onClick={handleClick} className="download-button">
        Download feedbacks as CSV
      </button>

      <div className="top-rated-list">
        <h2>Top 5 highest-rated services</h2>

        <div className="service-cards">
          {average_ratings &&
            getTop5().map((entry, index) => (
              <ServiceCard
                key={index + 1}
                place={index + 1}
                service={entry.service_name}
                rating={entry.average_rating}
              />
            ))}
        </div>
      </div>

      <h2>Charts</h2>

      <div className="charts">
        <div className="average-ratings">
          <UniversalChart
            type="bar"
            x={average_ratings?.map((entry) => entry.service_name)}
            y={average_ratings?.map((entry) => entry.average_rating)}
          />
        </div>

        <div className="submission-trend">
          <UniversalChart
            type="line"
            x={submission_trend?.map((entry) => entry.date)}
            y={submission_trend?.map((entry) => entry.submission_count)}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
