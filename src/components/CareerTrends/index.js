import React, { Fragment, useState } from 'react'

const CareerTrends = ({ careers }) => {

    return (
        <Fragment>
            {careers.map((career, index) => {
                return <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mt-2">
                    <div className="card d-flex align-items-center">
                        <img src={career.image} className="card-img-top w-60 h-70" alt={career.title} />
                        <div className="card-body text-center">
                            <h5 className="card-title fs-14">{career.title} </h5>
                        </div>
                    </div>
                </div>
            })}

        </Fragment>
    )
}

export default CareerTrends