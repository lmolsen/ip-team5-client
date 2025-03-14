import "./widget.scss";
import responses from "../../data/responses.json";
import { useEffect, useState } from "react";

function Widget({ pageName, persona }) {
  const [initial, setInitial] = useState(true);
  const [expand, setExpand] = useState(false);
  const [transparency, setTransparency] = useState(true);
  const [closeWidget, setCloseWidget] = useState(false);

  function handleWidgetClose(event) {
    setCloseWidget(true);
  }

  function handleOpen() {
    setCloseWidget(false);
  }

  function handleExpand(event) {
    setExpand(!expand);
    if (expand) {
      setCloseWidget(false);
    }
  }

  function handleOpacity(event) {
    if (initial) {
      setTransparency(!transparency);
      setInitial(false);
    }
  }

  useEffect(() => {}, [closeWidget]);

  function formatSummary(summary) {
    const points = summary.split(/\s(?=\d+\.)/);

    return points.map((point, index) => (
      <li key={index} className="summary-item">
        {point}
      </li> //
    ));
  }

  return closeWidget ? (
    <svg
      className={"cta__open"}
      width="200"
      height="35"
      viewBox="0 0 200 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleOpen}
      style={{ cursor: "pointer" }}
    >
      <g filter="url(#filter0_d_26_4)">
        <rect x="4" width="326" height="55" rx="17.5" fill="#C864A6" />
      </g>
      <rect x="8.5" y="4.5" width="60" height="26" rx="13" stroke="white" />
      <path
        d="M14 18H61V16H14L20 10L18 8L10 16L18 24L20 22L14 18Z"
        fill="white"
      />
    </svg>
  ) : (
    <div
      className={`widget${expand ? " widget__fullview" : ""}${
        closeWidget ? " widget__close" : ""
      }`}
    >
      <svg
        className={`cta${expand ? " cta__fullview" : " cta--transparent"}`}
        width="200"
        height="35"
        viewBox="0 0 200 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleExpand}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter0_d_26_4)">
          <rect x="4" width="326" height="55" rx="17.5" fill="#C864A6" />
        </g>
        <rect x="8.5" y="4.5" width="60" height="26" rx="13" stroke="white" />
        <path
          d={
            expand
              ? "M61 18H14V16H61L55 10L57 8L65 16L57 24L55 22L61 18Z"
              : "M14 18H61V16H14L20 10L18 8L10 16L18 24L20 22L14 18Z"
          }
          fill="white"
        />
      </svg>

      <section
        className={`content${expand ? " content__fullview" : ""}${
          !expand ? " content--transparent" : ""
        }`}
        onClick={handleOpacity}
      >
        <div className="close__button" onClick={handleWidgetClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="25px"
            height="25px"
          >
            <path d="M 11.5 11 C 11.372 11 11.243984 11.048984 11.146484 11.146484 C 11.049484 11.244484 11 11.372 11 11.5 C 11 11.628 11.048484 11.755516 11.146484 11.853516 L 24.292969 25 L 11.146484 38.146484 C 10.951484 38.341484 10.951484 38.658516 11.146484 38.853516 C 11.244484 38.950516 11.372 39 11.5 39 C 11.628 39 11.755516 38.951516 11.853516 38.853516 L 25 25.707031 L 38.146484 38.853516 C 38.341484 39.048516 38.658516 39.048516 38.853516 38.853516 C 39.048516 38.657516 39.049516 38.342484 38.853516 38.146484 L 25.707031 25 L 38.853516 11.853516 C 39.048516 11.658516 39.048516 11.341484 38.853516 11.146484 C 38.657516 10.951484 38.342484 10.950484 38.146484 11.146484 L 25 24.292969 L 11.853516 11.146484 C 11.756016 11.048984 11.628 11 11.5 11 z" />
          </svg>
        </div>
        <div className="content__expand" onClick={handleExpand}>
          <div>
            {responses.map((item, index) => {
              return item.page === pageName &&
                item.persona_id === parseInt(persona) ? (
                <div key={index}>
                  {expand ? (
                    <div className="summary">
                      <p>
                        <strong>What you need to know:</strong>
                        {formatSummary(item.personalized_summary)}
                      </p>
                      <p>
                        <strong>Next Steps:</strong>
                        <div className="next-steps">{item.next_steps}</div>
                      </p>
                    </div>
                  ) : (
                    <div className="summarized-summary">
                      {item.summarized_summary}
                    </div>
                  )}
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </section>
      <div className="sidebar" onClick={handleWidgetClose}></div>
    </div>
  );
}

export default Widget;
