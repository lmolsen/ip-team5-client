import "./widget.scss";
import responses from "../../data/responses.json";
import { useState } from "react";

function Widget({ pageName, persona }) {
  const [initial, setInitial] = useState(true);
  const [expand, setExpand] = useState(false);
  const [transparency, setTransparency] = useState(true);
  const [closeWidget, setCloseWidget] = useState(false);

  
  function handleWidgetClose(event) {
    setCloseWidget(!closeWidget);
    setExpand(false);
    setTransparency(true);
    setTimeout(() => setCloseWidget(false), 300);
  }

  function handleExpand(event) {
    setExpand(!expand);
  }

  function handleOpacity(event) {
    if (initial) {
      setTransparency(!transparency);
      setInitial(false);
    }
  }

  function getSectionClassName() {
    let classname = "content";
    if (expand) {
      classname += " content__fullview";
    }
    if (closeWidget) {
      classname += " content--hide";  
    }
    if (!closeWidget && !expand) {
      classname += " content--transparent";
    }
    return classname;
  }

  function getCtaClassName() {
    let ctaClass = "cta";
    if (expand) {
      ctaClass += " cta__fullview";
    } else {
      ctaClass += " cta--transparent";
    }

    if (closeWidget) {
      ctaClass += " cta--hidden";
    }

    return ctaClass;
  }

  function formatSummary(summary) {
    const points = summary.split(/\s(?=\d+\.)/); 
  
    return points.map((point, index) => (
      <li key={index} className="summary-item">{point}</li> //
    ));
  }

  return (
    <div className={expand ? "widget widget__fullview" : "widget"}>
      <svg 
        className={getCtaClassName()}
        width="200" 
        height="35" 
        viewBox="0 0 200 30" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleExpand}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter0_d_26_4)">
          <rect x="4" width="326" height="55" rx="17.5" fill="#C864A6"/>
        </g>
        <rect x="8.5" y="4.5" width="60" height="26" rx="13" stroke="white"/>
        <path
          d={expand
            ? "M61 18H14V16H61L55 10L57 8L65 16L57 24L55 22L61 18Z" 
            : "M14 18H61V16H14L20 10L18 8L10 16L18 24L20 22L14 18Z"} 
          fill="white"
        />
      </svg>

      <section className={getSectionClassName()} onClick={handleOpacity}>
        <div className="content__expand" onClick={handleExpand}>
          <div>
            {responses.map((item, index) => {
              return item.page === pageName &&
                item.persona_id === parseInt(persona) ? (
                  <div key={index}>
                  {expand ? ( 
                    <div className="summary">
                      <p>
                        <strong>What you need to know:
                          </strong> 
                          {formatSummary(item.personalized_summary)}
                      </p>
                      <p>
                        <strong>Next Steps:
                          </strong> 
                          <div className="next-steps">
                            {item.next_steps}
                          </div>
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
