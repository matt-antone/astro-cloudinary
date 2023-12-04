import type { Template } from 'tinacms'

import * as React from 'react';

interface IEventRegisterButtonProps {
  title: string
  startDate: Date
  endDate: Date
  street1: string
  street2: string
  city: string  
  state: string
  postcode: string
  registrationUrl: string
  locationName: string
}


const EventRegisterButton = (props:any) => {
  const { title, startDate, endDate, street1, street2, city, state, postcode, registrationUrl, locationName } = props;
  const now = React.useMemo(() => {
    return new Date();
  }, []);

  const st = React.useMemo(() => {
    return new Date(startDate);
  }, []);

  const ed = React.useMemo(() => {
    return new Date(endDate);
  }, []);

  console.log(now, st, ed, ed < now)

  return ed > now ? (
    <div className='not-prose inline'>
      <article className='article not-prose'>
        <header>
          <h2>
            <span className='text-lg font-bold text-balance'>
              {title}
            </span>
          </h2>
          <time>{st.toLocaleString()}</time>
        </header>
        <address className='py-4'>
          <strong className='font-medium'>{ locationName && `${locationName}` }{locationName && <br />}</strong>
          {street1}{ street2 && `, ${street2}`}<br />
          {city}, {state}, {postcode}<br />
        </address>
        <footer>
          <a 
            className={`inline-flex text-lg p-3 rounded-sm bg-lime`} 
            href={registrationUrl} 
            target="new" 
            rel="noopener noreferer">
              Register Now
          </a>
        </footer>
      </article>
    </div>
  ) : ""
};


export default EventRegisterButton;


export const EventRegisterButtonFields: Template = {
  name: "EventRegisterButton",
  label: "Event Register Button",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "datetime",
      name: "startDate",
      label: "Start Date",
      ui: {
        timeFormat: "HH:mm"
      },
    },
    {
      type: "datetime",
      name: "endDate",
      label: "End Date",
      ui: {
        timeFormat: "HH:mm"
      },
    },
    {
      type: "string",
      name: "locationName",
      label: "Location Name",
    },
    {
      type: "string",
      name: "street1",
      label: "Street 1",
    },
    {
      type: "string",
      name: "street2",
      label: "Street 2",
    
    },
    {
      type: "string",
      name: "city",
      label: "City",
    },
    { 
      type: "string",
      name: "state",
      label: "State",
    },
    {
      type: "string",
      name: "postcode",
      label: "Postcode",
    },
    {
      type: "string",
      name: "registrationUrl",
      label: "Registration Url",
    }
  ],
}
