import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FaAngleRight } from 'react-icons/lib/fa';
import format from 'date-fns/format';
import styles from './ThumbnailCard.css';

import Link from './Link';
import OptimizeImage from './OptimizeImage';
import NoImagePath from '../assets/noimage.png';

const ThumbnailCard = props => {
  const { item, wide = false } = props;
  const date = item.date && new Date(item.date);
  const isExternalURL = /^https?:\/\//.test(item.permalink);

  return (
    <div
      className={classnames({
        [styles.itemWrapper]: true,
        [styles.wide]: wide,
      })}
    >
      <Link
        className={styles.item}
        to={isExternalURL ? null : item.permalink}
        href={isExternalURL ? item.permalink : null}
      >
        <div className={styles.thumbnailImageWrapper}>
          <OptimizeImage
            className={styles.thumbnailImage}
            src={item.thumbnail || NoImagePath}
            width={350}
          />
        </div>
        {date && (
          <p className={styles.datetime}>
            <small>
              <time dateTime={format(date)}>{format(date, 'YYYY/MM/DD')}</time>
            </small>
          </p>
        )}
        <p className={styles.title}>
          <strong>{item.title}</strong>
        </p>
        <small className={styles.readmore}>
          <FaAngleRight />
          <span>続きを読む</span>
        </small>
      </Link>
    </div>
  );
};

export default withStyles(styles)(ThumbnailCard);
