import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography'

const BreadCrumbs = () => {
    const location = useLocation()
    const paths = location.pathname.split("/").filter(x => x).slice(1).filter(x => !Number.parseInt(x))


    const hoverStyle = {
        "&:hover": {
            color: "primary.main"
        }
    }

    return (
        <Breadcrumbs color="white">
            {paths.map((path, i) =>
                paths.length - 1 === i ? (
                    <Typography key={i}
                        fontWeight={700}
                        fontSize={14}
                        textTransform="capitalize"
                        sx={{ cursor: "default", color: "primary.main" }} >
                        {path.replace("%20", " ")}
                    </Typography>
                ) : (
                    <Link key={i} to={location.pathname.split(path, -1)[0] + path} >
                        <Typography
                            color="white"
                            fontWeight={700}
                            fontSize={14}
                            textTransform="capitalize"
                            sx={hoverStyle} >
                            {path.replace("%20", " ")}
                        </Typography>
                    </Link>
                )
            )}
        </Breadcrumbs >
    )
}

export default BreadCrumbs