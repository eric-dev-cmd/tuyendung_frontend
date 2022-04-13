import React, { Fragment } from 'react'
import JobItem from './JobItem'

const JobList = () => {
    return (
        <Fragment>
            <div className="py-2">
                <JobItem />
            </div>
        </Fragment>
    )
}

export default JobList