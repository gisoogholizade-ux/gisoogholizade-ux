package com.lifelingo.api.progress;

import com.lifelingo.api.user.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="progress", uniqueConstraints=@UniqueConstraint(columnNames="user_id"))
public class Progress {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @OneToOne(optional=false, fetch=FetchType.LAZY) @JoinColumn(name="user_id", nullable=false) private User user;
  @Column(nullable=false) private int xp=0;
  @Column(nullable=false) private int level=1;
  @Column(nullable=false) private int completedMissions=0;
  @Column(nullable=false) private int streak=0;
  private LocalDate lastStudyDate;
  @Column(nullable=false) private int studyDays=0;
  @Column(nullable=false) private long totalSeconds=0;
  @Column(nullable=false) private int dailyDay=1;
  private LocalDate dailyCompletedDate;
  protected Progress(){}
  public Progress(User user){this.user=user;}
  public Long getId(){return id;} public int getXp(){return xp;} public int getLevel(){return level;} public int getCompletedMissions(){return completedMissions;} public int getStreak(){return streak;} public LocalDate getLastStudyDate(){return lastStudyDate;} public int getStudyDays(){return studyDays;} public long getTotalSeconds(){return totalSeconds;} public int getDailyDay(){return dailyDay;} public LocalDate getDailyCompletedDate(){return dailyCompletedDate;}
  public void addSessionSeconds(long seconds){totalSeconds+=Math.max(0,Math.min(seconds,3600));}
  public void markStudy(LocalDate today){if(lastStudyDate==null){streak=1;studyDays=1;}else if(today.equals(lastStudyDate)){}else if(today.equals(lastStudyDate.plusDays(1))){streak++;studyDays++;}else{streak=1;studyDays++;}lastStudyDate=today;}
  public void completeMission(LocalDate today,int earnedXp){markStudy(today);completedMissions++;xp+=Math.max(0,earnedXp);level=1+(xp/500);}
  public void completeDaily(LocalDate today){if(today.equals(dailyCompletedDate))return;markStudy(today);dailyCompletedDate=today;dailyDay=Math.min(365,dailyDay+1);xp+=10;level=1+(xp/500);}
}
