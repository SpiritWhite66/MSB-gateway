package com.msb.gateway.repository;

import com.msb.gateway.domain.ChannelLinked;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ChannelLinked entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChannelLinkedRepository extends JpaRepository<ChannelLinked, Long> {
}
