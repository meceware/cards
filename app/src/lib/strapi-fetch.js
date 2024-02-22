const StrapiFetch = async( filter ) => {
  const parseJSON = resp => ( resp.json ? resp.json() : resp );
  const checkStatus = resp => {
    if ( resp.status >= 200 && resp.status < 300 ) {
      return resp;
    }

    return parseJSON( resp ).then( r => {
      return { data: {} };
    } );
  };

  const data = await fetch( `${ process.env.STRAPI_API_URL }/${ filter }`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ process.env.STRAPI_API_TOKEN }`,
      'Content-type': 'application/json',
    },
    next: {
      cache: 'no-store',
      revalidate: 0,
    },
  } ).then( checkStatus ).then( parseJSON );

  return data;
};

export { StrapiFetch };
