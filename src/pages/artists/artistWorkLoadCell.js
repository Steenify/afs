import React from 'react';
import { connect } from 'react-redux';

const ArtistWorkLoadCell = ({
  totalNew,
  totalDoing,
  totalReview,
  newOrderArray,
  doingArray,
  reviewArray,
  data,
}) => {
  let artistWorkload = [].concat(newOrderArray, doingArray, reviewArray);
  artistWorkload.length = 8;

  artistWorkload = Array.from(
    artistWorkload,
    (item) =>
      item || {
        name: '',
      },
  );

  return (
    <div className='artists__cell artists__workload workload'>
      <div className='workload__number'>
        New: {totalNew}, Doing: {totalDoing}, Reviewing: {totalReview}
      </div>
      <div className='workload__progress'>
        {artistWorkload.map((work, index) => (
          <div
            key={`work_load__item__${index}__order__${data}`}
            className={`workload__item ${work?.name}`}></div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ artists }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};

  const newOrder = item?.numNewOrder || 0;

  const doing =
    (item?.numSketch || 0) +
    (item?.numSketchEdit || 0) +
    (item?.numColorEdit || 0) +
    (item?.numColor || 0);

  const reviewing =
    (item?.numSketchReview || 0) +
    (item?.numColorReview || 0) +
    (item?.numExportFile || 0);

  const newOrderArray = [...Array(item?.numNewOrder || 0).keys()].map(() => ({
    name: 'New',
  }));

  const SketchArray = [...Array(item?.numSketch || 0).keys()].map(() => ({
    name: 'Doing',
  }));
  const SketchEditArray = [...Array(item?.numSketchEdit || 0).keys()].map(
    () => ({
      name: 'Doing',
    }),
  );
  const ColorArray = [...Array(item?.numColor || 0).keys()].map(() => ({
    name: 'Doing',
  }));
  const ColorEditArray = [...Array(item?.numColorEdit || 0).keys()].map(() => ({
    name: 'Doing',
  }));

  const SketchReviewArray = [...Array(item?.numSketchReview || 0).keys()].map(
    () => ({
      name: 'Review',
    }),
  );
  const ColorReviewArray = [...Array(item?.numColorReview || 0).keys()].map(
    () => ({
      name: 'Review',
    }),
  );
  const ExportFilesArray = [...Array(item?.numExportFile || 0).keys()].map(
    () => ({
      name: 'Review',
    }),
  );

  return {
    totalNew: newOrder,
    totalDoing: doing,
    totalReview: reviewing,
    newOrderArray,
    doingArray: [].concat(
      SketchArray,
      SketchEditArray,
      ColorArray,
      ColorEditArray,
    ),
    reviewArray: [].concat(
      SketchReviewArray,
      ColorReviewArray,
      ExportFilesArray,
    ),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistWorkLoadCell);
