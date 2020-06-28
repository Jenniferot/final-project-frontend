/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'

export const Review = ({ review }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (review.content.length > 1000) {
      setVisible(false)
    }
  }, [])


  return (
    <>
      <section className="review-item">
        <div className={`review ${visible ? "show" : "hide"}`}>
          {review.content}
        </div>
        {!visible &&
          <a
            className="show-more-less-link"
            onClick={() => setVisible(true)}>
            Show more
          </a>
        }
        {review.content.length > 1000 && visible &&
          <a
            className="show-more-less-link"
            onClick={() => setVisible(false)}>
            Show less
        </a>
        }
        <div className="author">
          - {review.author} <span>&#40;The MovieDB User&#41;</span>
        </div>
      </section>
    </>
  )
}