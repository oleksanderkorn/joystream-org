import React from 'react';
import { formatNumber } from '../../utils/formatNumber';
import useAxios from '../../utils/useAxios';

const DataLabel = ({ title, value }) => {
  return (
    <div className="Stats__Label">
      <span className="Stats__Label__Text">{title}</span>
      <h1 className="Stats__Label__Value">{value}</h1>
    </div>
  );
};

export default function TokenStats() {
  const [data, loading, error] = useAxios();

  if (loading && !error) {
    return <div>Loading...</div>;
  } else if (error) {
    console.error(error);
    return <div>Error...</div>;
  }
  const { dollarPool, actualIssuance, price } = data;

  return (
    <div className="Stats__Container">
      <DataLabel title="Price:" value={`$${price}`} />
      <DataLabel title="Backing Value:" value={`$${formatNumber(dollarPool.size)}`} />
      <DataLabel title="Supply:" value={`${formatNumber(actualIssuance)}`} />
    </div>
  );
}
