import { useRef, useState } from 'react';
import './GroupEntityForm.css';

const dev_url = 'https://api-dev-prisma.entity-management.agridence.com/';
const prod_url = 'https://api-platform.entity-management.prismabyrspo.org/';
const fetchURL = (name) =>
  `${prod_url}api/v1/group-entity/${name}`;

function fetchData (token, name) {
  return fetch(fetchURL(name), {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => response.json())
    .then(data => {
      if(data.prismaGroupEntityId) {
        return {
          mailingAddress: data.mailingAddress,
          registeredAddress: data.registeredAddress,
          billingAddress: data.billingAddress,
          billingContactPerson: data.billingContactPerson,
          tin: data.tin,
          sstRegistrationNo: data.sstRegistrationNo,
          billingCountry: data.billingCountry,
          fax: data.fax,
          telephone: data.telephone,
          contactPersons: data.contactPersons,
        }
      }
      console.error(data);
    });
}

function patchData (token, name, body) {
  return fetch(fetchURL(name), {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body,
  })
}

export function GroupEntityForm({ token }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const inputRef = useRef(null);

  const handleFetch = () => {
    setLoading(true);
    fetchData(token, inputRef.current.value)
      .then(json => setText(JSON.stringify(json, null, 2)))
      .finally(() => setLoading(false)); 
  }

  const handlePatch = () => {
    setLoading(true);
    patchData(token, inputRef.current.value, text)
      .finally(() => setLoading(false));
  }

  return (
    <div className="group-entity-form">
      <h3>Group Entity Form</h3>
      <div className="group-entity-name-group">
        <input
          className="group-entity-name-input"
          ref={inputRef}
          placeholder="group_entity_name"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
        >
          Fetch
        </button>
        <button
          onClick={handlePatch}
          disabled={loading}
        >
          Patch
        </button>
      </div>
      <textarea
        className="group-entity-form-textarea"
        rows="30"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
    </div>
  );
}