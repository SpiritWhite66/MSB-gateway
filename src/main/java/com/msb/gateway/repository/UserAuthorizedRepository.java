package com.msb.gateway.repository;

import com.msb.gateway.domain.UserAuthorized;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserAuthorized entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserAuthorizedRepository extends JpaRepository<UserAuthorized, Long> {
}
