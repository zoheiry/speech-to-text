import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';

import { Table } from '@fashiontrade/wardrobe';

const IdCell = styled(Table.Cell)`
  font-size: 14px !important;
  color: #999;
`;

const StyledTable = styled(Table)`
  color: #333;
  font-size: 18px;
  text-align: left;
`;

const TranscriptLink = styled(Link)`
  text-decoration: none;
  color: ${p => p.theme.primary};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > *:first-child {
    margin-right: 5px;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const renderRecording = (recording = {}) => {
  const { createdAt, name, id } = recording;
  const date = moment(createdAt).format('DD MMM YYYY - HH:mm');
  return (
    <Table.Row>
      <IdCell title={id}>{id}</IdCell>
      <Table.Cell>{date}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>
        <TranscriptLink to={`/recordings/${id}`}>
          <FiExternalLink />
          <span>Read transcript</span>
        </TranscriptLink>
      </Table.Cell>
    </Table.Row>
  );
};

const RecordingsList = ({ recordings }) => (
  <StyledTable minWidth="500px">
    <Table.Header>
      <Table.Cell>ID</Table.Cell>
      <Table.Cell>Uploaded at</Table.Cell>
      <Table.Cell>Name</Table.Cell>
      <Table.Cell />
    </Table.Header>
    {recordings.items.map((recording) => renderRecording(recording))}
  </StyledTable>
);

RecordingsList.propTypes = {
  recordings: PropTypes.object,
};

export default RecordingsList;
