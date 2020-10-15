import React from 'react';
import SearchTagPresenter from './SearchTagPresenter';
import { useQuery } from 'react-apollo-hooks';
import { SETTING_POPULAR_TAGS } from './SearchTagQueries';

export default () => {
  const { loading, data } = useQuery(SETTING_POPULAR_TAGS);

  return <SearchTagPresenter loading={loading} data={data} />;
};
